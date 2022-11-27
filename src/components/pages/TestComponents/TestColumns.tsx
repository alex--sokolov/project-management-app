import { ColumnsService } from '@/services/api/ColumnsService';
import Button from '@mui/material/Button';
import { useState } from 'react';

const existUserId = '6383689e2a31e4ffb30e50af';
const existOtherUserId = '63822b732a31e4ffb30e4fcf';
const existBoardId = '638368cc2a31e4ffb30e50b2';
const existColumnId = '638369772a31e4ffb30e50b4';

export const TestColumns = () => {
  const [columnId, setColumnId] = useState(existColumnId);

  const onGetAll = async (boardId: string) => {
    const allColumns = await ColumnsService.getAllColumns(boardId);
    console.log('allColumns: ', allColumns);
  };

  const onGetById = async (boardId: string, columnId: string) => {
    const getById = await ColumnsService.getColumnById(boardId, columnId);
    console.log('getById: ', getById);
  };

  const onCreateColumn = async (boardId: string) => {
    const newColumn = {
      title: 'New column',
      order: 2,
    };
    const createColumn = await ColumnsService.createNewColumn(boardId, newColumn);
    setColumnId(createColumn._id);
    console.log('createColumn: ', createColumn);
  };

  const onUpdateColumn = async (boardId: string) => {
    const newColumnData = {
      _id: columnId,
      title: 'New column update',
      order: 3,
    };
    const updatedColumn = await ColumnsService.updateColumnById(boardId, newColumnData);
    console.log('updatedColumn: ', updatedColumn);
  };

  const onDeleteById = async (boardId: string, columnId: string) => {
    const deletedColumn = await ColumnsService.deleteColumnById(boardId, columnId);
    console.log('deletedColumn: ', deletedColumn);
  };

  const onGetByList = async (userId: string) => {
    const getByList = await ColumnsService.getColumnsByListOfColumnsIdsOrIdUser(undefined, userId);
    console.log('columnListByUserId: ', getByList);
  };

  const onChangeColumnsOrder = async (columnId1: string, columnId2: string) => {
    const columnArr = [
      {
        _id: columnId1,
        order: 5,
      },
      {
        _id: columnId2,
        order: 7,
      },
    ];
    const changedColumns = await ColumnsService.changeColumnsOrderInListOfColumns(columnArr);
    console.log('changedColumns: ', changedColumns);
  };

  const onCreateSetOfColumns = async (boardId: string) => {
    const newSetOfColumns = [
      {
        title: 'Column 555',
        boardId: boardId,
        order: 555,
      },
      {
        title: 'Column 666',
        boardId: boardId,
        order: 666,
      },
      {
        title: 'Column 777',
        boardId: boardId,
        order: 777,
      },
    ];
    const createColumnSet = await ColumnsService.createSetOfColumns(newSetOfColumns);
    setColumnId(createColumnSet[createColumnSet.length - 1]._id);
    console.log('createColumnSet: ', createColumnSet);
  };

  return (
    <>
      <div>Results in console</div>
      <Button variant="contained" onClick={() => onGetAll(existBoardId)}>
        Get all columns
      </Button>
      <Button variant="contained" onClick={() => onGetById(existBoardId, columnId)}>
        Get column by id
      </Button>
      <Button variant="contained" onClick={() => onCreateColumn(existBoardId)}>
        Create column
      </Button>
      <Button variant="contained" onClick={() => onUpdateColumn(existBoardId)}>
        Update column
      </Button>
      <Button variant="contained" onClick={() => onDeleteById(existBoardId, columnId)}>
        Delete column
      </Button>
      <Button variant="contained" onClick={() => onGetByList(existUserId)}>
        Get columns by list
      </Button>
      <Button variant="contained" onClick={() => onChangeColumnsOrder(existColumnId, columnId)}>
        Change orders in column list
      </Button>
      <Button variant="contained" onClick={() => onCreateSetOfColumns(existBoardId)}>
        Create set of columns
      </Button>
    </>
  );
};
