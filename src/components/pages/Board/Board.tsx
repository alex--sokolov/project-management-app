import './Board.scss';

import { useEffect, useState } from 'react';
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useBoardById, useColumnsByBoardId, useTasksByBoardId } from '@/hooks';
import { MultipleContainers } from './MultipleContainers/MultipleContainers';
import { sleep } from '@/utils/sleep';
import { boardError } from '@/services/toasts/toasts';
import { TIME_AUTO_CLOSE, TIME_TOAST_DELAY } from '@/configs/toasts';

import { User, Board, Column, Task, MultipleProps } from '@/data/models';

export const BoardComponent = () => {
  const { t } = useTranslation();
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
        boardError(404, `${t('toasts.board-not-found')}`);
        await sleep(TIME_AUTO_CLOSE + TIME_TOAST_DELAY);
        navigate('/boards');
      })();
    } else {
      if (boardId && boardFetch !== undefined && boardFetch._id) {
        setBoard(boardFetch);
      }
    }
  }, [boardFetch, boardId, user, navigate]);

  useEffect(() => {
    if (columnsFetch?.data && columns?.data !== columnsFetch?.data) {
      columnsFetch.data.sort((a, b) => a.order - b.order);
      setColumns(columnsFetch);
    }
  }, [columnsFetch]);

  useEffect(() => {
    if (tasksFetch?.data && tasks?.data !== tasksFetch?.data) {
      setTasks(tasksFetch);
    }
  }, [tasksFetch]);

  const [boardData, setBoardData] = useState<MultipleProps | null>(null);

  useEffect(() => {
    if (Array.isArray(columns.data) && Array.isArray(tasks.data)) {
      const columnsArr = columns.data.map((column: Column) => {
        return {
          ...column,
          tasks: Array.isArray(tasks.data)
            ? tasks?.data.filter((task: Task) => task.columnId === column._id)
            : [],
        };
      });
      setBoardData({
        userData: user as User,
        boardData: board as Board,
        columnsData: {
          refetch: columns.refetch,
          columns: columnsArr,
        },
      });
    }
  }, [columns, tasks]);

  return (
    <section className="board">
      {board ? (
        <>
          <div className="board-header">
            <h1 className="board-header__title">
              {board.title}
              <span className="board-header__owner">
                ({` `}
                {t('board.owner')}: {user.name}
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
    </section>
  );
};
