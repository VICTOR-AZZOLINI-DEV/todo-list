export interface User {
  ID_USER: number;
  WALLET_ADDRESS: string;
  NICKNAME: string;
}

export interface Task {
  ID_TASK: number;
  TASK_NAME: string;
  TASK_DESCRIPTION: string;
  TASK_DONE: boolean;
  TASK_OWNER_WALLET: string;
}

export type TasksArrayJsonResponse = {
  tasks: Task[];
};

export interface ResponseWithData {
  httpStatus: number;
  data: UserArrayJsonResponse | ErrorResponse | User;
}

export type UserArrayJsonResponse = {
  users: User[];
};

type ErrorResponse = {
  message: string;
};
