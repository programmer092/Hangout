import express from "express";
import auth from "../middleware/auth";

import {
  login,
  register,
  logout,
  profileUpload,
  userByid,
  users,
} from "../controller/userController";

import {
  sendMessage,
  getMessage,
  getFiles,
} from "../controller/messageController";
import { Profileupload } from "../config/multerProfile";
import { Fileupload } from "../config/multerFile";
const router = express.Router();

router.post("/chat/register", register);

router.post("/chat/login", login);

router.post("/chat/logout", logout);

router.post(
  "/chat/uploadProfile",
  auth,
  Profileupload.single("avatar"),
  profileUpload
);

router.get("/chat/user/:id", auth, userByid);
router.get("/chat/alluser", auth, users);

router.post(
  "/chat/sendMessage/:id",
  auth,
  Fileupload.single("file"),
  sendMessage
);
router.get("/chat/getMessage/:id", auth, getMessage);
router.get("/chat/getFiles/:id", auth, getFiles);

export default router;
