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

  const orderRange = `[1 - ${maxOrder}]`;

  // console.log('errors', errors);
  // console.log('!!Object.keys(errors).length', !!Object.keys(errors).length);
  // console.log('isDirty', isDirty);
  // console.log('isSubmitting', isSubmitting);

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
              message: t('forms-errors.add-column-title.min-length'),
            },
            maxLength: {
              value: 25,
              message: t('forms-errors.add-column-title.max-length'),
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
            required: 'this field is required',
            valueAsNumber: true,
            validate: (value) =>
              (Number.isInteger(value) && value > 0 && value <= maxOrder) ||
              t('forms-errors.add-column-order') + orderRange,
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
