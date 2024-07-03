import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { Request } from "express";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "hangout/messageFiles",
      format: file.mimetype.split("/")[1],
      public_id: file.originalname.split(".")[0],
    };
  },
});

export const Fileupload = multer({ storage: storage });
