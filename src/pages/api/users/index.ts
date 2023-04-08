import type { NextApiRequest, NextApiResponse } from "next";
import fetchAllUsers from "./fetchAllUsers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { httpStatus, data } = await fetchAllUsers();

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
