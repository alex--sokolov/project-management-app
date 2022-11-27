import { request } from '@/utils/axios-utils';

import { Column } from '@/data/models';

export const ColumnsService = {
  async getAllColumns(boardId: string): Promise<Column[]> {
    return await request({ url: `/boards/${boardId}/columns` });
  },

  async getColumnById(boardId: string, columnId: string): Promise<Column> {
    return await request({ url: `/boards/${boardId}/columns/${columnId}` });
  },

  async createNewColumn(boardId: string, column: Omit<Column, '_id' | 'boardId'>): Promise<Column> {
    return await request({
      url: `/boards/${boardId}/columns`,
      method: 'post',
      data: {
        title: column.title,
        order: column.order,
      },
    });
  },

  async updateColumnById(boardId: string, column: Omit<Column, 'boardId'>): Promise<Column> {
    return await request({
      url: `/boards/${boardId}/columns/${column._id}`,
      method: 'put',
      data: {
        title: column.title,
        order: column.order,
      },
    });
  },

  async deleteColumnById(boardId: string, columnId: string) {
    return await request({ url: `/boards/${boardId}/columns/${columnId}`, method: 'delete' });
  },

  async getColumnsByListOfColumnsIdsOrIdUser(ids?: string[], userId?: string): Promise<Column[]> {
    const paramIds = ids ? `ids=[${ids.toString()}]` : null;
    const paramUserId = userId ? `userId=${userId}` : null;

    const params =
      paramIds && paramUserId ? `${paramIds}&${paramUserId}` : paramIds ? paramIds : paramUserId;

    return await request({ url: `/columnsSet?${params}` });
  },

  async changeColumnsOrderInListOfColumns(
    columns: Omit<Column, '_id' | 'boardId'>[]
  ): Promise<Column[]> {
    return await request({ url: '/columnsSet', method: 'patch', data: columns });
  },

  async createSetOfColumns(columns: Omit<Column, '_id'>[]): Promise<Column[]> {
    return await request({ url: '/columnsSet', method: 'post', data: columns });
  },
};
