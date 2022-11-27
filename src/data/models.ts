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
