import getConnection from "@/database/getConnection";
import { ResponseWithData } from "@/interfaces";
import type { UserArrayJsonResponse } from "@/interfaces";

export default async function fetchAllUsers(): Promise<ResponseWithData> {
  const conn = await getConnection();

  let query = "SELECT ID_USER, WALLET_ADDRESS, NICKNAME FROM `USER`";

  try {
    const [rows, fields] = await conn.execute(query);

    const jsonResponse: UserArrayJsonResponse = {
      users: rows,
    };

    return { httpStatus: 200, data: jsonResponse };
  } catch (exception) {
    return {
      httpStatus: 500,
      data: { message: "Internal Server Error. Wait a few minutes." },
    };
  } finally {
    conn.end();
  }
}
