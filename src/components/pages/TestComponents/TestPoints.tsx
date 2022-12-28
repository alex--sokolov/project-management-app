import { useState } from 'react';
import Button from '@mui/material/Button';

import { PointsService } from '@/services/api/PointsService';

const existUserId = '638498d52a31e4ffb30e5173';
const existBoardId = '638498ed2a31e4ffb30e5177';
const existTaskId = '6384990c2a31e4ffb30e517e';
const existPointId = '638c8b352a31e4ffb30e545d';

export const TestPoints = () => {
  const [pointId, setPointId] = useState(existPointId);

  const onGetAllPointsByTaskId = async (taskId: string) => {
    const allPointsOfCurrentTask = await PointsService.getPointsByTaskId(taskId);
    console.log('allPointsOfCurrentTask: ', allPointsOfCurrentTask);
  };

  const onCreatePoint = async (taskId: string, boardId: string) => {
    const newPoint = {
      title: 'New point',
      taskId,
      boardId,
      done: false,
    };
    const createPoint = await PointsService.createNewPoint(newPoint);
    setPointId(createPoint._id);
    console.log('createPoint: ', createPoint);
  };

  const onUpdatePoint = async (pointId: string) => {
    const newTitle = 'New title for point';
    const done = true;
    const updatedPoint = await PointsService.updatePointById(pointId, newTitle, done);
    console.log('updatedPoint: ', updatedPoint);
  };

  const onUpdateSetOfPoints = async () => {
    const point1 = {
      _id: existPointId,
      done: true,
    };
    const point2 = {
      _id: pointId,
      done: false,
    };
    const points = [point1, point2];
    const updatedPoints = await PointsService.updateSetOfPoints(points);
    console.log('updatedSetOfPoints: ', updatedPoints);
  };

  const onDeleteById = async (pointId: string) => {
    const deletedPoint = await PointsService.deletePointById(pointId);
    console.log('deletedPoint: ', deletedPoint);
  };

  const onGetByList = async (userId: string) => {
    const ids = undefined;
    // const ids = [pointId1, pointId2];
    const getByList = await PointsService.getPointsByListOfIdsOrUserId(ids, userId);
    console.log('pointsListByIdsOrUser: ', getByList);
  };

  return (
    <>
      <div>Results in console</div>
      <Button variant="contained" onClick={() => onGetAllPointsByTaskId(existTaskId)}>
        Get all task points
      </Button>
      <Button variant="contained" onClick={() => onCreatePoint(existTaskId, existBoardId)}>
        Create point
      </Button>
      <Button variant="contained" onClick={() => onUpdatePoint(pointId)}>
        Update point
      </Button>
      <Button variant="contained" onClick={() => onUpdateSetOfPoints()}>
        Update set of points
      </Button>
      <Button variant="contained" onClick={() => onDeleteById(pointId)}>
        Delete point
      </Button>
      <Button variant="contained" onClick={() => onGetByList(existUserId)}>
        Get tasks by list, user and search
      </Button>
    </>
  );
};
