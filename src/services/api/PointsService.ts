import { request } from '@/utils/axios-utils';

import { Point } from '@/data/models';

export const PointsService = {
  async getPointsByTaskId(taskId: string): Promise<Point[]> {
    return await request({ url: `/points/${taskId}` });
  },

  async createNewPoint(point: Omit<Point, '_id'>): Promise<Point> {
    return await request({
      url: `/points`,
      method: 'post',
      data: point,
    });
  },

  async updatePointById(pointId: string, title: string, done: boolean): Promise<Point> {
    return await request({
      url: `/points/${pointId}`,
      method: 'patch',
      data: {
        title,
        done,
      },
    });
  },

  async updateSetOfPoints(points: Pick<Point, '_id' | 'done'>[]): Promise<Point[]> {
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
