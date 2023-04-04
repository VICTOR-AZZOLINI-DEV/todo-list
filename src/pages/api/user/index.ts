// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "dotenv/config";
const mysql = require("mysql2/promise");

interface User {
  ID_USER: number;
  WALLET_ADDRESS: string;
}

type JsonResponse = {
  users: User[];
};

type ErrorResponse = {
  message: String;
};

interface ResponseWithData {
  httpStatus: number;
  data: JsonResponse | ErrorResponse;
}

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
};

async function getUsers(_walletAddress: String): Promise<ResponseWithData> {
  const connection = await mysql.createConnection(config.DATABASE_URL);

  let query = "SELECT ID_USER, WALLET_ADDRESS, NICKNAME FROM `USER`";
  let queryParams: any[] = [];
  if (_walletAddress !== "") {
    query += " WHERE WALLET_ADDRESS = ?";
    queryParams = [_walletAddress || null];
  }

  try {
    const [rows, fields] = await connection.execute(query, queryParams);

    const jsonResponse: JsonResponse = {
      users: rows,
    };

    return { httpStatus: 200, data: jsonResponse };
  } catch (exception) {
    return {
      httpStatus: 500,
      data: { message: "Internal Server Error. Wait a few minutes." },
    };
  } finally {
    connection.end();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const walletAddress = req.query.walletAddress
      ? String(req.query.walletAddress)
      : "";

    const { httpStatus, data } = await getUsers(walletAddress);

    res
      .setHeader("Content-Type", "application/json")
      .status(httpStatus)
      .json(data);
  } else {
    res
      .status(405)
      .json({ message: "invalid method request", solution: "use GET" });
  }
}
