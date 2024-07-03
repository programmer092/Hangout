import { Request, Response, NextFunction } from "express";
import User, { Duser } from "../model/userSchema";
import jwt from "jsonwebtoken";
import "../router/chat";
import dotenv from "dotenv";

export interface InfoRequest extends Request {
  body: any;
  file?: Express.Multer.File;
  params: { id: string };
  cookies: { authToken: string };
  userInfo?: Duser;
}

dotenv.config();

const auth = async (req: InfoRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.authToken;
    const Key = process.env.SecretKey as string;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }
    const decoded = jwt.verify(token, Key) as { _id: string }; //returns _id
    const user = (await User.findOne({ _id: decoded._id })) as Duser | null;
    if (!user) {
      throw new Error("User not found");
    }
    req.userInfo = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;
