import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads/profileImages/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const Profileupload = multer({ storage: storage });
