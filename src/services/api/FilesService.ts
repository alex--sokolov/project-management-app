import { request } from '@/utils/axios-utils';

import { File } from '@/data/models';

export const FilesService = {
  async getFilesByBoardId(boardId: string): Promise<File[]> {
    return await request({ url: `/file/${boardId}` });
  },

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

  async uploadFile(boardId: string, taskId: string, file: Blob, fileName: string): Promise<File> {
    const data = new FormData();
    data.set('boardId', boardId);
    data.set('taskId', taskId);
    data.set('file', file, fileName);

    return await request({
      url: `/file`,
      method: 'post',
      data,
      headers: {
        contentType: 'multipart/form-data',
      },
    });
  },

  async deleteFileById(fileId: string): Promise<File> {
    return await request({
      url: `/file/${fileId}`,
      method: 'delete',
    });
  },
};
