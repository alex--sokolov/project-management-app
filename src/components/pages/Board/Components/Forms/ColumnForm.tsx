import { Column } from '@/data/models';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';

const defaultColumnFields = {
  title: '',
  order: 0,
};

export const ColumnForm: FC<{
  createColumn: (newColumn: Omit<Column, '_id'>) => void;
  boardId: string | undefined;
}> = ({ createColumn, boardId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Column, '_id | boardId'>>({
    defaultValues: defaultColumnFields,
  });
  const [isFormOpened, setIsFormOpened] = useState(false);
  const onCreateBtnHandler = () => {
    setIsFormOpened(true);
  };
  const onSubmit: SubmitHandler<Omit<Column, '_id | boardId'>> = (data) => {
    if (boardId) {
      const newColumnData: Omit<Column, '_id'> = { ...data, boardId };
      createColumn(newColumnData);
      setIsFormOpened(false);
      reset();
    }
  };

  return (
    <div className="user-board user-board_add-btn">
      {!isFormOpened ? (
        <>
          <Fab color="secondary" aria-label="edit" onClick={onCreateBtnHandler}>
            <AddIcon />
          </Fab>{' '}
          + Add column
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
              Add column
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
