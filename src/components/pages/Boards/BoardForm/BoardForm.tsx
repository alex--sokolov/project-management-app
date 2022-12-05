import { Board } from '@/data/models';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
const defaultBoardFields = {
  title: '',
  description: '',
  owner: '',
  users: [],
};

export const BoardForm: FC<{
  createBoard: (newBoard: Omit<Board, '_id'>) => void;
  userId: string | undefined;
}> = ({ createBoard, userId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Board, '_id'>>({
    defaultValues: defaultBoardFields,
  });
  const [isFormOpened, setIsFormOpened] = useState(false);
  const onCreateBtnHandler = () => {
    setIsFormOpened(true);
  };
  const onSubmit: SubmitHandler<Omit<Board, '_id' | 'owner' | 'users'>> = (data) => {
    if (userId) {
      const newBoardObj: Omit<Board, '_id'> = { ...data, owner: userId, users: [userId] };
      createBoard(newBoardObj);
      setIsFormOpened(false);
      reset();
    }
  };

  return (
    <div className="user-board user-board_add-btn">
      {!isFormOpened ? (
        <Fab color="secondary" aria-label="edit" onClick={onCreateBtnHandler}>
          <AddIcon />
        </Fab>
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
                    message: `you must enter not more 25 letters`,
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
                    value: 200,
                    message: `you must enter not more 200 letters`,
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

            <button className="auth__submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};
