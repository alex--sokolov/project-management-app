import './Board.scss';

import { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useBoardById } from '@/hooks/board/useBoardById';
import { User, Board, ColumnWithTasks, Column, Task, MultipleProps } from '@/data/models';
import { boardError } from '@/services/toasts/toasts';
import { sleep } from '@/utils/sleep';
import { TIME_AUTO_CLOSE, TIME_LOGOUT_DELAY } from '@/configs/toasts';
import { MultipleContainers } from './MultipleContainers/MultipleContainers';
import { useColumnsByBoardId } from '@/hooks/board/useColumnsByBoardId';
import { useTasksByBoardId } from '@/hooks/board/useTasksByBoardId';
import { Modal } from '@/services/modals';

export const BoardComponent = () => {
  const navigate = useNavigate();
  const user: User = useOutletContext();
  const { pathname } = useLocation();
  const boardId = pathname.slice(8);
  const boardFetch: Board | undefined = useBoardById(boardId).data;
  const [board, setBoard] = useState(boardFetch);
  const columnsFetch = useColumnsByBoardId(board?._id);
  const tasksFetch = useTasksByBoardId(board?._id);
  const [columns, setColumns] = useState(columnsFetch);
  const [tasks, setTasks] = useState(tasksFetch);

  useEffect(() => {
    const boardUsers = boardFetch ? [boardFetch?.owner, ...boardFetch?.users] : null;
    if (
      !boardId ||
      (boardFetch !== undefined &&
        !boardFetch._id &&
        (!boardUsers || !boardUsers.includes(user._id)))
    ) {
      (async () => {
        boardError(404, 'Board was not found');
        await sleep(TIME_AUTO_CLOSE + TIME_LOGOUT_DELAY);
        navigate('/boards');
      })();
    } else {
      if (boardId && boardFetch !== undefined && boardFetch._id) {
        setBoard(boardFetch);
      }
    }
  }, [boardFetch, boardId, user, navigate]);

  useEffect(() => {
    if (columnsFetch?.data && !columns?.data) {
      columnsFetch.data.sort((a, b) => a.order - b.order);
      setColumns(columnsFetch);
    }
  }, [columnsFetch]);

  useEffect(() => {
    if (tasksFetch?.data && !tasks?.data) {
      setTasks(tasksFetch);
    }
  }, [tasksFetch]);

  const [boardData, setBoardData] = useState<MultipleProps | null>(null);

  useEffect(() => {
    if (Array.isArray(columns.data) && Array.isArray(tasks.data)) {
      const columnsData = columns.data.map((column: Column) => {
        return {
          ...column,
          tasks: Array.isArray(tasks.data)
            ? tasks?.data.filter((task: Task) => task.columnId === column._id)
            : [],
        };
      });
      setBoardData({ boardData: board as Board, columnsData });
    }
  }, [columns, tasks]);

  console.log('boardData', boardData);

  return (
    <section className="board">
      {board ? (
        <>
          <div className="board-header">
            <h1 className="board-header__title">
              {board.title}
              <span className="board-header__owner">
                ({` `}owner: {user.name}
                {`< ${user.login}>`}
                {` `})
              </span>
            </h1>

            <h2 className="board-header__description">{board.description}</h2>
          </div>
          {boardData && <MultipleContainers data={boardData} />}
        </>
      ) : (
        <></>
      )}
      <ToastContainer />
    </section>
  );
};
