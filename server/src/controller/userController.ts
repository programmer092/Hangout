import express, { Request, Response } from "express";
import { InfoRequest } from "../middleware/auth";
import User from "../model/userSchema";
import auth from "../middleware/auth";

export const login = async (req: Request, res: Response) => {
  try {
    const result = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await result.generateToken();

    res.cookie("authToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).send(result);
  } catch (e: string | any) {
    res.status(400).send(e.message);
  }
};

export const register = async (req: Request, res: Response) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateToken();
    res.cookie("authToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.send(user);
  } catch (e: string | any) {
    res.status(400).send(e.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken");
    res.json({ message: "Successfully Logged Out!" });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const profileUpload = async (req: InfoRequest, res: Response) => {
  const Imgfile = req.file;
  if (!Imgfile) {
    return res.status(400).send("No file Uploaded!");
  }

  const user = req.userInfo?._id;
  await User.findByIdAndUpdate(
    user,
    { profileImg: `/profilePicture/${Imgfile.filename}` },
    { new: true }
  );

  const data = await User.findById(user, "-password");
  res.send(data);
};

export const userByid = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    res.send(user);
  } catch (e) {
    res.status(400).send("Could not find the user!");
  }
};

export const users = async (req: InfoRequest, res: Response) => {
  try {
    const myId = req.userInfo?._id;

    const allUsers = await User.find(
      { _id: { $ne: myId } },
      "-password -token"
    );
    if (allUsers.length === 0) {
      return res.status(200).send([]);
    }

    res.status(200).send(allUsers);
  } catch (error: string | any) {
    res.status(400).send(error.message);
  }
};
