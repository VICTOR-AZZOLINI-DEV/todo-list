import getConnection from "@/database/getConnection";
import type { ResponseWithData, User } from "@/interfaces";

export default async function fetchUser(
  _walletAddress: string
): Promise<ResponseWithData> {
  const conn = await getConnection();

  let query =
    "SELECT ID_USER, WALLET_ADDRESS, NICKNAME FROM `USER` WHERE WALLET_ADDRESS = ?";

  try {
    const [rows, fields] = await conn.execute(query, [_walletAddress]);

    if (rows.length === 0) {
      return {
        httpStatus: 404,
        data: { message: "User not found" },
      };
    }

    const user: User = {
      ID_USER: rows[0].ID_USER,
      WALLET_ADDRESS: rows[0].WALLET_ADDRESS,
      NICKNAME: rows[0].NICKNAME,
    };

    return { httpStatus: 200, data: user };
  } catch (exception) {
    console.log(exception);
    return {
      httpStatus: 500,
      data: { message: "Internal Server Error. Wait a few minutes." },
    };
  } finally {
    conn.end();
  }
}
