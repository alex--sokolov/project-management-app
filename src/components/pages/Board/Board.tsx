import './Board.scss';

import { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useBoardById } from '@/hooks/board/useBoardById';
import { User, Board, ColumnWithTasks, Column, Task } from '@/data/models';
import { boardError } from '@/services/toasts/toasts';
import { sleep } from '@/utils/sleep';
import { TIME_AUTO_CLOSE, TIME_LOGOUT_DELAY } from '@/configs/toasts';
import { MultipleContainers } from './MultipleContainers/MultipleContainers';
import { useColumnsByBoardId } from '@/hooks/board/useColumnsByBoardId';
import { useTasksByBoardId } from '@/hooks/board/useTasksByBoardId';

export const BoardComponent = () => {
  const navigate = useNavigate();
  const user: User = useOutletContext();
  const { pathname } = useLocation();
  const boardId = pathname.slice(8);

  // console.log('pathname: ', pathname.slice(8));
  const boardFetch: Board | undefined = useBoardById(boardId).data;

  const [board, setBoard] = useState(boardFetch);
  // console.log('boardId: ', boardId);
  // console.log('board: ', board, typeof board);

  const columnsFetch = useColumnsByBoardId(board?._id);
  const tasksFetch = useTasksByBoardId(board?._id);

  const [columns, setColumns] = useState(columnsFetch);
  const [tasks, setTasks] = useState(tasksFetch);

  useEffect(() => {
    const boardUsers = boardFetch ? [boardFetch?.owner, ...boardFetch?.users] : null;
    // console.log('boardUsers: ', boardUsers);
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
      setColumns(columnsFetch);
    }
  }, [columnsFetch]);

  useEffect(() => {
    if (tasksFetch?.data && !tasks?.data) {
      setTasks(tasksFetch);
    }
  }, [tasksFetch]);

  console.log('user: ', user);
  console.log('board: ', board);
  console.log('columns: ', columns);
  console.log('columnsFetch: ', columnsFetch);
  console.log('tasks: ', tasks);
  console.log('tasksFetch: ', tasksFetch);

  const [boardData, setBoardData] = useState<ColumnWithTasks[] | null>(null);

  useEffect(() => {
    if (Array.isArray(columns.data) && Array.isArray(tasks.data)) {
      const data = columns.data.map((column: Column) => {
        return {
          ...column,
          tasks: Array.isArray(tasks.data) ? tasks?.data.filter((task: Task) => task.columnId) : [],
        };
      });

      console.log('data!!!!!!!!!!!!!!!!!!!!!!!!', data);

      setBoardData(data);
    }
  }, [columns, tasks]);

  console.log('boardData', boardData);

  // const boardData = [
  //   {
  //     boardId: 'fd',
  //     order: 1,
  //     title: 'Column First',
  //     _id: '76457868376846',
  //     tasks: [
  //       {
  //         _id: '638e4cf32a31e4ffb30e5bec',
  //         title: 'First task',
  //         order: 0,
  //         description: 'Some description',
  //         userId: '638de0622a31e4ffb30e59bf',
  //         boardId: '638de0702a31e4ffb30e59c2',
  //         columnId: '638e4c142a31e4ffb30e5bd9',
  //         users: [],
  //       },
  //       {
  //         _id: '638e4cf32a31retret',
  //         title: 'Second task',
  //         order: 0,
  //         description: 'Some description',
  //         userId: '638de0622a31e4ffb30e59bf',
  //         boardId: '638de0702a31e4ffb30e59c2',
  //         columnId: '638e4c142a31e4ffb30e5bd9',
  //         users: [],
  //       },
  //     ],
  //   },
  //   {
  //     boardId: 'fd',
  //     order: 2,
  //     title: 'Column Second',
  //     _id: '64564564565',
  //     tasks: [
  //       {
  //         _id: '638e4dfdfdfdc',
  //         title: 'First task',
  //         order: 0,
  //         description: 'Some description',
  //         userId: '638de0622a31e4ffb30e59bf',
  //         boardId: '638de0702a31e4ffb30e59c2',
  //         columnId: '638e4c142a31e4ffb30e5bd9',
  //         users: [],
  //       },
  //       {
  //         _id: '6fdfddfdftret',
  //         title: 'Second task',
  //         order: 0,
  //         description: 'Some description',
  //         userId: '638de0622a31e4ffb30e59bf',
  //         boardId: '638de0702a31e4ffb30e59c2',
  //         columnId: '638e4c142a31e4ffb30e5bd9',
  //         users: [],
  //       },
  //     ],
  //   },
  // ];

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
          {boardData && <MultipleContainers myColumns={boardData} />}
        </>
      ) : (
        <></>
      )}
      <ToastContainer />
    </section>
  );
};
