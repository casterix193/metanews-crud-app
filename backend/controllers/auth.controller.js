import Admin from "../models/Admin";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export const JWT_SECRET =
  "aPV9L+cMAD5KnLlk7PUfK8pgF1VLlyvLlSc1PEcfqj4pSez/BpcLMfbwuaxxwaph1fE1jFd/ZSgL0RF9xTFImgJjxO6HbaxEAE3n1EJ3S78X4KGShleshki3Ffle1XgB6lLeyTWH0HTTnvq2X3Sw3Navxsk9zLOjpXBAuYP1wMiCzm/2BZ9LDmau5lCbWuRPlEV3YHFNA4V9jsSj7+uHI/6BIxpl1Z9vOXFyeC2cRQ450AvZEzBiaV/2nQ5wuqH1IyO5hn3fVZZHEvtGPubrx+pE5/carfTLcZlPC7yahLFYjUsMiba/KGlYS2WszcZouYaEBjT7zzgTfLxh+P/S0Q==";

export const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide valid data" });
  }
  try {
    let admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(400).json({ error: "No user found with given email" });
    }

    if (!bcrypt.compareSync(password, admin.password)) {
      return res
        .status(400)
        .json({ error: "Please check your password again" });
    }

    const token = sign(
      {
        _id: admin.id,
      },
      JWT_SECRET
    );

    admin = admin.toJSON();
    delete admin.password;
    return res.json({ token: token, user: admin });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ error: "Sorry, some error occurred" });
  }
};

export const getUser = async (req, res) => {
  try {
    let user = req.user;
    console.log("REQ", req.user);
    if (!user) return res.status(500).json({ error: "Some error occurred" });

    user = user.toJSON();
    delete user.password;
    return res.json({ user: user });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ error: "Sorry, some error occurred" });
  }
};
