import './TaskForm.scss';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

import { Task } from '@/data/models';

export const TaskForm: FC<{
  updateTask?: (
    taskId: string,
    boardId: string,
    columnId: string,
    userId: string,
    newTask: Pick<Task, 'title' | 'description' | 'order'>
  ) => void | Promise<void>;
  createTask?: (
    boardId: string,
    columnId: string,
    userId: string,
    newTask: Pick<Task, 'title' | 'description' | 'order'>
  ) => void | Promise<void>;
  taskId?: string;
  boardId: string | undefined;
  columnId: string | undefined;
  userId: string | undefined;
  handleClose: () => void;
  defaultValues: {
    title: string;
    description: string;
    order: number;
  };
}> = ({
  updateTask,
  createTask,
  taskId,
  boardId,
  columnId,
  userId,
  handleClose,
  defaultValues,
}) => {
  const { t } = useTranslation();
  const maxOrder = defaultValues.order;
  const orderRange = `[1 - ${maxOrder}]`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<Pick<Task, 'title' | 'description' | 'order'>>({
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<Pick<Task, 'title' | 'description' | 'order'>> = (data) => {
    if (boardId && columnId && userId) {
      if (createTask) {
        const newTaskData: Pick<Task, 'title' | 'description' | 'order'> = { ...data };
        createTask(boardId, columnId, userId, newTaskData);
      }
      if (updateTask && taskId) {
        const newTaskData: Pick<Task, 'title' | 'description' | 'order'> = {
          ...data,
          order: defaultValues.order,
        };
        updateTask(taskId, boardId, columnId, userId, newTaskData);
      }
      handleClose();
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
      <div className="auth__element">
        <TextField
          error={!!errors.title}
          label={t('board.task-title')}
          {...register('title', {
            required: t('forms-errors.required') || 'required',
            minLength: {
              value: 4,
              message: t('forms-errors.add-title.min-length'),
            },
            maxLength: {
              value: 25,
              message: t('forms-errors.add-title.max-length'),
            },
          })}
        />
        <p className="error">
          {errors.title && <span className="error__show">{errors.title.message}</span>}
        </p>
      </div>
      <div className="auth__element">
        <TextField
          error={!!errors.description}
          label={t('board.task-description')}
          {...register('description', {
            required: t('forms-errors.required') || 'required',
            minLength: {
              value: 10,
              message: t('forms-errors.add-description.min-length'),
            },
            maxLength: {
              value: 50,
              message: t('forms-errors.add-description.max-length'),
            },
          })}
        />
        <p className="error">
          {errors.description && <span className="error__show">{errors.description.message}</span>}
        </p>
      </div>
      {taskId ? (
        <></>
      ) : (
        <div className="auth__element">
          <TextField
            error={!!errors.order}
            label={t('board.task-order')}
            {...register('order', {
              required: t('forms-errors.required') || 'required',
              valueAsNumber: true,
              validate: (value) =>
                (Number.isInteger(value) && value > 0 && value <= maxOrder) ||
                t('forms-errors.add-order') + orderRange,
            })}
          />

          <p className="error">
            {errors.order && <span className="error__show">{errors.order.message}</span>}
          </p>
        </div>
      )}
      <Button
        type="submit"
        variant="contained"
        disabled={!!Object.keys(errors).length || !isDirty || isSubmitting}
      >
        {taskId ? t('board.update-task') : t('board.add-task')}
      </Button>
    </form>
  );
};
