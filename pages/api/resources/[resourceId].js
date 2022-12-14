import connectMongo from "../../../backend/database/conn";
import {
  deleteResource,
  getResource,
  updateResource,
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
      return await getResource(req, res);
    case "PUT":
      return await updateResource(req, res);
    case "DELETE":
      return await deleteResource(req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      return;
  }
}
