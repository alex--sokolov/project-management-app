import { request } from '@/utils/axios-utils';

import { Task } from '@/data/models';

export const TasksService = {
  async getAllTasksInColumn(boardId: string, columnId: string): Promise<Task[]> {
    return await request({ url: `/boards/${boardId}/columns/${columnId}/tasks` });
  },

  async getTaskById(boardId: string, columnId: string, taskId: string): Promise<Task> {
    return await request({ url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}` });
  },

  async createNewTask(
    boardId: string,
    columnId: string,
    task: Omit<Task, '_id' | 'boardId' | 'columnId'>
  ): Promise<Task> {
    return await request({
      url: `/boards/${boardId}/columns/${columnId}/tasks`,
      method: 'post',
      data: {
        title: task.title,
        description: task.description,
        order: task.order,
        userId: task.userId,
        users: task.users,
      },
    });
  },

  async updateTaskById(
    boardId: string,
    columnId: string,
    task: Omit<Task, 'boardId'>
  ): Promise<Task> {
    return await request({
      url: `/boards/${boardId}/columns/${columnId}/tasks/${task._id}`,
      method: 'put',
      data: {
        title: task.title,
        description: task.description,
        columnId: task.columnId,
        userId: task.userId,
        users: task.users,
        order: task.order,
      },
    });
  },

  async deleteTaskById(boardId: string, columnId: string, taskId: string): Promise<Task> {
    return await request({
      url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      method: 'delete',
    });
  },

  async getTasksByListOfTasksIdsOrIdUserOrSearch(
    ids?: string[],
    userId?: string,
    search?: string
  ): Promise<Task[]> {
    const paramIds = ids ? `ids=[${ids.toString()}]` : null;
    const paramUserId = userId ? `userId=${userId}` : null;
    const paramSearch = search ? `search=${search}` : null;
    const params = [paramIds, paramUserId, paramSearch].filter((param) => param !== null);
    const paramStr = params.length > 0 ? `?${params.join('&')}` : '';
    return await request({ url: `/tasksSet${paramStr}` });
  },

  async getAllTasksByBoardId(boardId: string): Promise<Task[]> {
    return await request({ url: `/tasksSet/${boardId}` });
  },

  async changeTasksOrderInListOfTasks(
    tasks: Pick<Task, '_id' | 'columnId' | 'order'>[]
  ): Promise<Task[]> {
    return await request({ url: '/tasksSet', method: 'patch', data: tasks });
  },
};
