import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../controllers/auth.controller";
import Admin from "../models/Admin";

export const verifyAuth = async (req) => {
  const header = req.headers["authorization"];

  if (!header) {
    throw new Error("You don't have access");
  }

  const splitted = header.split(" ");
  if (!splitted?.[1]) {
    throw new Error("You don't have access");
  }

  const token = splitted[1];
  try {
    const decoded = await verify(token, JWT_SECRET);
    let admin = await Admin.findById(decoded._id);

    if (!admin) {
      throw new Error("You don't have access");
    }

    delete admin.password;

    req.user = admin;

    return admin;
  } catch (error) {
    throw error;
  }
};
