import connectMongo from "../../../backend/database/conn";
import { getUser } from "../../../backend/controllers/auth.controller";
import { verifyAuth } from "../../../backend/middlewares/authentication";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res);

  try {
    await connectMongo();
  } catch {
    res.status(500).json({ error: "Error in the Connection" });
    return;
  }

  try {
    await verifyAuth(req);
  } catch (error) {
    console.log("ERROR", error);
    return res.status(401).json({ error: "You don't have access" });
  }

  return await getUser(req, res);
}
