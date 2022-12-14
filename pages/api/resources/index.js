import connectMongo from "../../../backend/database/conn";
import {
  createResource,
  getResources,
} from "../../../backend/controllers/resources.controller";
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

  const { method } = req;

  if (method !== "GET") {
    try {
      await verifyAuth(req);
    } catch (error) {
      return res.status(401).json({ error: "You don't have access" });
    }
  }

  switch (method) {
    case "GET":
      return await getResources(req, res);

    case "POST":
      return await createResource(req, res);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
  }
}
