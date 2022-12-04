import { request } from '@/utils/axios-utils';

import { Point } from '@/data/models';

export const TasksService = {
  async getPointsByTaskId(taskId: string): Promise<Point[]> {
    return await request({ url: `/points/${taskId}` });
  },

  async createNewPoint(title: string, taskId: string, boardId: string, done: true): Promise<Point> {
    return await request({
      url: `/points`,
      method: 'post',
      data: {
        title,
        taskId,
        boardId,
        done,
      },
    });
  },

  async updatePointById(pointId: string, title: string, done: true): Promise<Point> {
    return await request({
      url: `/points/${pointId}`,
      method: 'patch',
      data: {
        title,
        done,
      },
    });
  },

  async updateSetOfPoints(points: Pick<Point, '_id' | 'done'>): Promise<Point[]> {
    return await request({
      url: `/points`,
      method: 'patch',
      data: points,
    });
  },

  async getPointsByListOfIdsOrUserId(ids?: string[], userId?: string): Promise<Point[]> {
    const paramIds = ids ? `ids=[${ids.toString()}]` : null;
    const paramUserId = userId ? `userId=${userId}` : null;
    const params = [paramIds, paramUserId].filter((param) => param !== null);
    const paramStr = params.length > 0 ? `?${params.join('&')}` : '';
    return await request({ url: `/points/${paramStr}` });
  },

  async deletePointById(pointId: string): Promise<Point> {
    return await request({
      url: `/points/${pointId}`,
      method: 'delete',
    });
  },
};
