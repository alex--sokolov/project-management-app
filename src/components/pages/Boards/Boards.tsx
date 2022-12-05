import { useAuthUser } from '@/hooks';
import { useBoardsList } from '@/hooks/useBoardsList';
import { ToastContainer } from 'react-toastify';
import './Boards.scss';
import { UserBoard } from './UserBoard/UserBoard';
import { useBoardCreate } from '@/hooks/useBoardCreate';
import { useBoardDelete } from '@/hooks/useBoardDelete';
import { Board } from '@/data/models';
import { BoardForm } from './BoardForm/BoardForm';

export const Boards = () => {
  const authUser = useAuthUser();
  const boards = useBoardsList(authUser.data?.id);

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
      <div className="boards">
        {boards.data?.map((board) => (
          <UserBoard key={board._id} boardData={board} deleteBoard={deleteBoard} />
        ))}
        <BoardForm createBoard={createBoard} userId={authUser.data?.id} />
      </div>
      <ToastContainer />
    </>
  );
};
