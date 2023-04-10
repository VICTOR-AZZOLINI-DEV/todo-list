import { NextApiRequest, NextApiResponse } from "next";
import fetchUser from "./fetchUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  const walletAddress = query.walletAddress as string;

  if (method === "GET") {
    const { httpStatus, data } = await fetchUser(walletAddress);

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
