import './Board.scss';

import { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useBoardById } from '@/hooks/board/useBoardById';
import { User, Board } from '@/data/models';
import { boardError } from '@/services/toasts/toasts';
import { sleep } from '@/utils/sleep';
import { TIME_AUTO_CLOSE, TIME_LOGOUT_DELAY } from '@/configs/toasts';
import { MultipleContainers } from './MultipleContainers/MultipleContainers';

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

  console.log('user: ', user);
  console.log('board: ', board);
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
          <MultipleContainers />
        </>
      ) : (
        <></>
      )}
      <ToastContainer />
    </section>
  );
};
