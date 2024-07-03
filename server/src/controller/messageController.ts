import express, { Request, Response } from "express";
import { InfoRequest } from "../middleware/auth";
import User from "../model/userSchema";
import Message from "../model/messageSchema";
import auth from "../middleware/auth";
import Conversation from "../model/conversationSchema";
import { io, getSocketId } from "../index";
import { ObjectId } from "mongoose";

export const sendMessage = async (req: InfoRequest, res: Response) => {
  try {
    const message = req.body?.message || null;
    const filesend = req.file;
    const sender = req.userInfo?._id;
    const receiver = req.params.id;

    if ((!message || message.trim() === "") && !filesend) {
      return res.status(400).send({ error: "Message or file is required!" });
    }

    let fileUrl: string | null = null;

    if (filesend) {
      fileUrl = filesend.path;
    }

    const isReceiver = await User.findById(receiver);

    if (!isReceiver) {
      return res.status(401).send({ error: "Receiver not found!" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
      });
    }

    const newMessages = new Message({
      sender,
      receiver,
      message: message,
      file: fileUrl,
    });

    if (newMessages) {
      conversation.messages.push(newMessages._id as ObjectId);
    }
    if (filesend !== undefined && conversation.file !== undefined) {
      conversation.file.push(fileUrl as string);
    }

    //saves both the schemas at same time
    await Promise.all([conversation.save(), newMessages.save()]);

    //sends the message to the specific user using socketID.
    const receiverSocketId = getSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("MsgFromSocket", newMessages);
    }
    res.status(200).send(newMessages);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const getMessage = async (req: InfoRequest, res: Response) => {
  const sender = req.userInfo?._id;
  const receiver = req.params.id;

  const getMsg = await Conversation.findOne({
    participants: { $all: [sender, receiver] },
  }).populate("messages");

  if (!getMsg) return res.status(200).send([]);

  const comms = getMsg.messages;

  res.status(200).send(comms);
  try {
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const getFiles = async (req: InfoRequest, res: Response) => {
  const sender = req.userInfo?._id;
  const receiver = req.params.id;

  const getFile = await Conversation.findOne({
    participants: { $all: [sender, receiver] },
  }).populate("file");

  if (!getFile) return res.status(200).send([]);

  const comms = getFile.file;

  res.status(200).send(comms);
  try {
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
