import { request } from '@/utils/axios-utils';

import { Board } from '@/data/models';

export const BoardsService = {
  async getAllBoards(): Promise<Board[]> {
    return await request({ url: '/boards' });
  },

  async getBoardById(id: string): Promise<Board> {
    return await request({ url: `/boards/${id}` });
  },

  async createNewBoard(board: Omit<Board, '_id'>): Promise<Board> {
    return await request(
      {
        url: `/boards`,
        method: 'post',
        data: {
          title: board.title,
          description: board.description,
          owner: board.owner,
          users: board.users,
        },
      },
      false
    );
  },

  async updateBoardById(board: Board): Promise<Board> {
    return await request({
      url: `/boards/${board._id}`,
      method: 'put',
      data: {
        title: board.title,
        description: board.description,
        owner: board.owner,
        users: board.users,
      },
    });
  },

  async deleteBoardById(id: string) {
    return await request({ url: `/boards/${id}`, method: 'delete' });
  },

  async getBoardsByListOfBoardsIds(ids: string[]): Promise<Board[]> {
    return await request({ url: `/boardsSet?ids=[${ids.toString()}]` });
  },

  async getBoardsByUserId(userId: string): Promise<Board[]> {
    return await request({ url: `/boardsSet/${userId}` });
  },
};
