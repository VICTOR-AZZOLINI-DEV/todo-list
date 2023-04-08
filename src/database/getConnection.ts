import "dotenv/config";
const mysql = require("mysql2/promise");

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
};

export default async function getConnection() {
  return mysql.createConnection(config.DATABASE_URL);
}
