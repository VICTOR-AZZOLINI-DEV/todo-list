// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "dotenv/config";
const mysql = require("mysql2/promise");

type Data = {
  name: string;
};

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const connection = await mysql.createConnection(config.DATABASE_URL);

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM `USER`");
    res.json(rows);
  } finally {
    connection.end();
  }
}
