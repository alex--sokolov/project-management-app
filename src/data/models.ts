import { QueryObserverResult } from '@tanstack/react-query';

export interface User {
  _id: string;
  name: string;
  login: string;
}

export interface UserLogin {
  login: string;
  password: string;
}

export interface UserUpdate extends User {
  password: string;
}

export interface Board {
  _id: string;
  title: string;
  description: string;
  owner: string;
  users: string[];
}

export interface Column {
  _id: string;
  title: string;
  boardId: string;
  order: number;
}

export interface ColumnWithTasks extends Column {
  tasks: Task[];
}

export interface MultipleProps {
  userData: User;
  boardData: Board;
  columnsData: {
    refetch: () => Promise<QueryObserverResult<Column[], unknown>>;
    columns: ColumnWithTasks[];
  };
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  boardId: string;
  columnId: string;
  userId: string;
  users: string[];
  order: number;
}

export interface File {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface Point {
  _id: string;
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}
