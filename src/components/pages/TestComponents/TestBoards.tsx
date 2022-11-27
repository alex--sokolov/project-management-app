import { BoardsService } from '@/services/api/BoardsService';
import Button from '@mui/material/Button';
import { useState } from 'react';

const existUserId = '6380a07bb5205b69e9479661';
const existBoardId = '638263b82a31e4ffb30e4ff7';

export const TestBoards = () => {
  const [boardId, setBoardId] = useState(existBoardId);

  const onGetAll = async () => {
    const allBoards = await BoardsService.getAllBoards();
    console.log('allBoards: ', allBoards);
  };

  const onGetById = async (id: string) => {
    const getById = await BoardsService.getBoardById(id);
    console.log('getById: ', getById);
  };

  const onCreateBoard = async () => {
    const newBoard = {
      title: 'New board',
      description: 'with description',
      owner: existUserId,
      users: [existUserId],
    };
    const createBoard = await BoardsService.createNewBoard(newBoard);
    setBoardId(createBoard._id);
    console.log('createBoard: ', createBoard);
  };

  const onUpdateBoard = async () => {
    const newBoardData = {
      _id: boardId,
      title: 'New board update',
      description: 'with description update',
      owner: existUserId,
      users: [existUserId],
    };
    const updatedBoard = await BoardsService.updateBoardById(newBoardData);
    console.log('updateBoard: ', updatedBoard);
  };

  const onDeleteById = async (id: string) => {
    const deleteById = await BoardsService.deleteBoardById(id);
    console.log('deleteById: ', deleteById);
  };

  const onGetByList = async () => {
    const ids = [boardId, existBoardId];
    const getByList = await BoardsService.getBoardsByListOfBoardsIds(ids);
    console.log('getByList: ', getByList);
  };

  const onGetByUser = async (userId: string) => {
    const getByUser = await BoardsService.getBoardsByUserId(userId);
    console.log('userId: ', existUserId);
    console.log('getByUser: ', getByUser);
  };

  return (
    <>
      <div>Results in console: </div>
      <Button variant="contained" onClick={onGetAll}>
        Get all boards
      </Button>
      <Button variant="contained" onClick={() => onGetById(boardId)}>
        Get board by id
      </Button>
      <Button variant="contained" onClick={onCreateBoard}>
        Create board
      </Button>
      <Button variant="contained" onClick={onUpdateBoard}>
        Update board
      </Button>
      <Button variant="contained" onClick={() => onDeleteById(boardId)}>
        Delete board
      </Button>
      <Button variant="contained" onClick={onGetByList}>
        Get boards by list
      </Button>
      <Button variant="contained" onClick={() => onGetByUser(existUserId)}>
        Get boards by user
      </Button>
    </>
  );
};
