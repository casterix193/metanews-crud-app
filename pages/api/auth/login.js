import connectMongo from "../../../backend/database/conn";
import { login } from "../../../backend/controllers/auth.controller";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res);
  try {
    await connectMongo();
  } catch {
    res.status(500).json({ error: "Error in the Connection" });
    return;
  }

  return await login(req, res);
}
