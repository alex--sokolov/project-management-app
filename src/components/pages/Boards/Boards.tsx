import { useBoardsList } from '@/hooks/useBoardsList';
import './Boards.scss';
import { UserBoard } from './UserBoard/UserBoard';
import { useBoardCreate } from '@/hooks/useBoardCreate';
import { useBoardDelete } from '@/hooks/useBoardDelete';
import { Board, User } from '@/data/models';
import { BoardForm } from './BoardForm/BoardForm';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Boards = () => {
  const { t } = useTranslation();

  const user = useOutletContext<User>();

  const boards = useBoardsList(user._id);

  const boardCreate = useBoardCreate();
  const boardDelete = useBoardDelete();

  const createBoard = async (newBoard: Omit<Board, '_id'>) => {
    await boardCreate.mutateAsync(newBoard);
    boards.refetch();
  };

  const deleteBoard = async (boardId: string) => {
    await boardDelete.mutateAsync(boardId);
    boards.refetch();
  };

  return (
    <>
      <h2 style={{ marginLeft: '15px' }}>{t('main.boards-title')}</h2>
      <div className="boards">
        {boards.data?.map((board: Board) => (
          <UserBoard key={board._id} boardData={board} deleteBoard={deleteBoard} />
        ))}
        <BoardForm createBoard={createBoard} userId={user._id} />
      </div>
    </>
  );
};
