import { Column } from '@/data/models';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';

export const ColumnForm: FC<{
  createColumn: (newColumn: Omit<Column, '_id'>) => void;
  boardId: string | undefined;
  handleClose: () => void;
  totalColumns: number;
}> = ({ createColumn, boardId, handleClose, totalColumns }) => {
  const { t } = useTranslation();

  const maxOrder = totalColumns + 1;
  const orderRange = `[1 - ${maxOrder}]`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<Omit<Column, '_id | boardId'>>({
    defaultValues: {
      title: '',
      order: maxOrder,
    },
  });

  const onSubmit: SubmitHandler<Omit<Column, '_id | boardId'>> = (data) => {
    if (boardId) {
      const newColumnData: Omit<Column, '_id'> = { ...data, boardId };
      createColumn(newColumnData);
      handleClose();
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
      <div className="auth__element">
        <TextField
          error={!!errors.title}
          label={t('board.column-title')}
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
          {errors && <span className="error__show">{errors.title?.message}</span>}
        </p>
      </div>

      <div className="auth__element">
        <TextField
          error={!!errors.order}
          label={t('board.column-order')}
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
      <Button
        type="submit"
        variant="contained"
        disabled={!!Object.keys(errors).length || !isDirty || isSubmitting}
      >
        {t('board.add-column')}
      </Button>
    </form>
  );
};
