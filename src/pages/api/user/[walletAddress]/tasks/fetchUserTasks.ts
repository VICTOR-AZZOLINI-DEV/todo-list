import getConnection from "@/database/getConnection";
import { TasksArrayJsonResponse } from "@/interfaces";

interface JsonResponse {
  httpStatus: number;
  data: TasksArrayJsonResponse | { message: string };
}

export default async function FetchUserTasks(
  _walletAddress: string
): Promise<JsonResponse> {
  const conn = await getConnection();
  const query =
    "SELECT T.ID_TASK, T.TASK_NAME, T.TASK_DESCRIPTION, T.TASK_DONE, T.TASK_OWNER_WALLET FROM TASK T WHERE T.TASK_OWNER_WALLET = ? AND EXISTS (SELECT 1 FROM USER WHERE WALLET_ADDRESS = ?)";

  try {
    const [rows, fields] = await conn.execute(query, [
      _walletAddress,
      _walletAddress,
    ]);

    const data: TasksArrayJsonResponse = {
      tasks: rows,
    };

    return rows.length === 0
      ? {
          httpStatus: 404,
          data: { message: "Tasks not found" },
        }
      : {
          httpStatus: 200,
          data: data,
        };
  } catch (error) {
    return {
      httpStatus: 500,
      data: { message: "Internal Server Error. Wait a few minutes." },
    };
  } finally {
    conn.end();
  }
}
