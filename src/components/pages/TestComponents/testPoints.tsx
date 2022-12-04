import { useState } from 'react';
import Button from '@mui/material/Button';

import { PointsService } from '@/services/api/PointsService';

const existUserId = '638498d52a31e4ffb30e5173';
const existBoardId = '638498ed2a31e4ffb30e5177';
const existTaskId = '6384990c2a31e4ffb30e517e';
const existPointId = '638c8b352a31e4ffb30e545d';

export const PointsTasks = () => {
  // const [taskId, setTaskId] = useState(existTaskId);
  //
  // const onGetAllTasksInColumn = async (boardId: string, columnId: string) => {
  //   const allTasksInColumn = await TasksService.getAllTasksInColumn(boardId, columnId);
  //   console.log('allTasksInColumn: ', allTasksInColumn);
  // };
  //
  // const onGetById = async (boardId: string, columnId: string, taskId: string) => {
  //   const getById = await TasksService.getTaskById(boardId, columnId, taskId);
  //   console.log('getById: ', getById);
  // };
  //
  // const onCreateTask = async (boardId: string, columnId: string) => {
  //   const newTask = {
  //     title: 'New task',
  //     description: 'New task descriptioon',
  //     userId: existUserId,
  //     users: [],
  //     order: 3,
  //   };
  //   const createTask = await TasksService.createNewTask(boardId, columnId, newTask);
  //   setTaskId(createTask._id);
  //   console.log('createTask: ', createTask);
  // };
  //
  // const onUpdateTask = async (boardId: string, columnId: string) => {
  //   const newTaskData = {
  //     _id: taskId,
  //     title: 'New task update',
  //     description: 'New description update',
  //     columnId: existColumnId,
  //     userId: existUserId,
  //     users: [existAnotherUserId],
  //     order: 7,
  //   };
  //   const updatedTask = await TasksService.updateTaskById(boardId, columnId, newTaskData);
  //   console.log('updatedTask: ', updatedTask);
  // };
  //
  // const onDeleteById = async (boardId: string, columnId: string, taskId: string) => {
  //   const deletedTask = await TasksService.deleteTaskById(boardId, columnId, taskId);
  //   console.log('deletedTask: ', deletedTask);
  // };
  //
  // const onGetByList = async (taskId1: string, userId: string) => {
  //   const ids = undefined;
  //   // const ids = [taskId1, taskId];
  //   // const search = undefined;
  //   const search = 'New';
  //   const getByList = await TasksService.geTasksByListOfTasksIdsOrIdUserOrSearch(
  //     ids,
  //     userId,
  //     search
  //   );
  //   console.log('taskListByIdsUserSearch: ', getByList);
  // };

  return (<>
  </>);
};
