export interface User {
  ID_USER: number;
  WALLET_ADDRESS: string;
  NICKNAME: string;
}

export interface ResponseWithData {
  httpStatus: number;
  data: JsonResponse | ErrorResponse | User;
}

export type JsonResponse = {
  users: User[];
};

type ErrorResponse = {
  message: string;
};
