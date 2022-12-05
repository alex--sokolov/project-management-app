import { Board } from '@/data/models';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import './UserBoard.scss';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/hooks';
import { Modal } from '@/services/modals';

export const UserBoard: FC<{ boardData: Board; deleteBoard: (boardId: string) => void }> = ({
  boardData,
  deleteBoard,
}) => {
  const { isModalOpen, close, open } = useModal();
  const navigate = useNavigate();
  const modalType = 'Are you sure?';

  const deleteClickHandler = () => {
    open();
  };
  const boardClickHandler = () => {
    navigate(`/boards/${boardData._id}`);
  };

  const handleClick = (value: string) => {
    if (value === 'yes') {
      deleteBoard(boardData._id);
    }
    close();
    return value;
  };
  return (
    <>
      <div className="user-board-wrapper">
        <div className="user-board" onClick={boardClickHandler}>
          <div className="user-board__data-container">
            <h2 className="user-board__title">{boardData.title}</h2>
            <div className="user-board__desc">{boardData.description}</div>
          </div>
        </div>
        <div className="user-board__controls">
          <Fab size="small" color="secondary" aria-label="delete" onClick={deleteClickHandler}>
            <DeleteIcon />
          </Fab>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          text={modalType}
          handleClick={(modalType) => handleClick(modalType)}
        />
      )}
    </>
  );
};
