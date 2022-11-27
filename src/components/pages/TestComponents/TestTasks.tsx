import { useState } from 'react';
import Button from '@mui/material/Button';

import { TasksService } from '@/services/api/TasksService';

const existUserId = '6383689e2a31e4ffb30e50af';
const existAnotherUserId = '63822b732a31e4ffb30e4fcf';
const existBoardId = '638368cc2a31e4ffb30e50b2';
const existColumnId = '638373ab2a31e4ffb30e512e';
const existTaskId = '638375d02a31e4ffb30e5134';

export const TestTasks = () => {
  const [taskId, setTaskId] = useState(existTaskId);

  const onGetAllTasksInColumn = async (boardId: string, columnId: string) => {
    const allTasksInColumn = await TasksService.getAllTasksInColumn(boardId, columnId);
    console.log('allTasksInColumn: ', allTasksInColumn);
  };

  const onGetById = async (boardId: string, columnId: string, taskId: string) => {
    const getById = await TasksService.getTaskById(boardId, columnId, taskId);
    console.log('getById: ', getById);
  };

  const onCreateTask = async (boardId: string, columnId: string) => {
    const newTask = {
      title: 'New task',
      description: 'New task descriptioon',
      userId: existUserId,
      users: [],
      order: 3,
    };
    const createTask = await TasksService.createNewTask(boardId, columnId, newTask);
    setTaskId(createTask._id);
    console.log('createTask: ', createTask);
  };

  const onUpdateTask = async (boardId: string, columnId: string) => {
    const newTaskData = {
      _id: taskId,
      title: 'New task update',
      description: 'New description update',
      columnId: existColumnId,
      userId: existUserId,
      users: [existAnotherUserId],
      order: 7,
    };
    const updatedTask = await TasksService.updateTaskById(boardId, columnId, newTaskData);
    console.log('updatedTask: ', updatedTask);
  };

  const onDeleteById = async (boardId: string, columnId: string, taskId: string) => {
    const deletedTask = await TasksService.deleteTaskById(boardId, columnId, taskId);
    console.log('deletedTask: ', deletedTask);
  };

  const onGetByList = async (taskId1: string, userId: string) => {
    const ids = undefined;
    // const ids = [taskId1, taskId];
    // const search = undefined;
    const search = 'New';
    const getByList = await TasksService.geTasksByListOfTasksIdsOrIdUserOrSearch(
      ids,
      userId,
      search
    );
    console.log('taskListByIdsUserSearch: ', getByList);
  };

  return (
    <>
      <div>Results in console</div>
      <Button
        variant="contained"
        onClick={() => onGetAllTasksInColumn(existBoardId, existColumnId)}
      >
        Get all tasks
      </Button>
      <Button variant="contained" onClick={() => onGetById(existBoardId, existColumnId, taskId)}>
        Get task by id
      </Button>
      <Button variant="contained" onClick={() => onCreateTask(existBoardId, existColumnId)}>
        Create task
      </Button>
      <Button variant="contained" onClick={() => onUpdateTask(existBoardId, existColumnId)}>
        Update task
      </Button>
      <Button variant="contained" onClick={() => onDeleteById(existBoardId, existColumnId, taskId)}>
        Delete task
      </Button>
      <Button variant="contained" onClick={() => onGetByList(existTaskId, existUserId)}>
        Get tasks by list, user and search
      </Button>
    </>
  );
};
