import './TaskForm.scss';

import { Task } from '@/data/models';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const defaultColumnFields = {
  title: '',
  description: '',
  order: 0,
};

export const TaskForm: FC<{
  createTask: (
    boardId: string,
    columnId: string,
    userId: string,
    newTask: Pick<Task, 'title' | 'description' | 'order'>
  ) => void;
  boardId: string | undefined;
  columnId: string | undefined;
  userId: string | undefined;
}> = ({ createTask, boardId, columnId, userId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pick<Task, 'title' | 'description' | 'order'>>({
    defaultValues: defaultColumnFields,
  });
  const [isFormOpened, setIsFormOpened] = useState(false);
  const { t } = useTranslation();
  const onCreateBtnHandler = () => {
    setIsFormOpened(true);
  };
  const onSubmit: SubmitHandler<Pick<Task, 'title' | 'description' | 'order'>> = (data) => {
    if (boardId && columnId && userId) {
      const newTaskData: Pick<Task, 'title' | 'description' | 'order'> = { ...data };
      createTask(boardId, columnId, userId, newTaskData);
      setIsFormOpened(false);
      reset();
    }
  };

  return (
    <div className="add-task add-task-btn">
      {!isFormOpened ? (
        <>
          <Fab color="secondary" aria-label="edit" onClick={onCreateBtnHandler}>
            <AddIcon />
          </Fab>{' '}
          + {t('board.add-task')}
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
            <div className="auth__element">
              <input
                className="auth__input"
                type="text"
                {...register('title', {
                  required: 'this field is required',
                  minLength: {
                    value: 4,
                    message: `you must enter at least 4 letters`,
                  },
                  maxLength: {
                    value: 25,
                    message: `you must enter less, than 25 letters`,
                  },
                })}
                placeholder="Title"
              />
              <p className="error">
                {errors.title && <span className="error__show">{errors.title.message}</span>}
              </p>
            </div>
            <div className="auth__element">
              <input
                className="auth__input"
                type="text"
                {...register('description', {
                  required: 'this field is required',
                  minLength: {
                    value: 10,
                    message: `you must enter at least 10 letters`,
                  },
                  maxLength: {
                    value: 25,
                    message: `you must enter less, than 25 letters`,
                  },
                })}
                placeholder="Description"
              />
              <p className="error">
                {errors.description && (
                  <span className="error__show">{errors.description.message}</span>
                )}
              </p>
            </div>
            <div className="auth__element">
              <input
                className="auth__input"
                type="text"
                {...register('order', {
                  required: 'this field is required',
                  valueAsNumber: true,
                  validate: (value) => value >= 0 || `Must be a positive number or 0`,
                })}
                placeholder="Order"
              />
              <p className="error">
                {errors.order && <span className="error__show">{errors.order.message}</span>}
              </p>
            </div>
            <Button type="submit" variant="contained">
              {t('board.add-task')}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
