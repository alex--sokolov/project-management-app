import { request } from '@/utils/axios-utils';

import { File } from '@/data/models';

export const FilesService = {
  async getFilesByListOfIdsOrUserIdOrTaskId(
    ids?: string[],
    userId?: string,
    taskId?: string
  ): Promise<File[]> {
    const paramIds = ids ? `ids=[${ids.toString()}]` : null;
    const paramUserId = userId ? `userId=${userId}` : null;
    const paramTaskId = taskId ? `taskId=${taskId}` : null;
    const params = [paramIds, paramUserId, paramTaskId].filter((param) => param !== null);
    const paramStr = params.length > 0 ? `?${params.join('&')}` : '';
    return await request({ url: `/file/${paramStr}` });
  },

  async uploadFile(boardId: string, taskId: string, file: Blob): Promise<File> {
    const body = new FormData();
    body.append('boardId', boardId);
    body.append('taskId', taskId);
    body.append('file', file);

    return await request({
      url: `/file`,
      method: 'post',
      body,
    });
  },

  async deleteFile(fileId: string): Promise<File> {
    return await request({
      url: `/file/${fileId}`,
      method: 'delete',
    });
  },

  async getFilesByBoardId(boardId: string): Promise<File[]> {
    return await request({ url: `/file/${boardId}` });
  },
};
