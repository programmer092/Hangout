import mongoose, { Document, Model } from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";
import "../db/db";
import isEmail from "validator/lib/isEmail.js";
import "../router/chat";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface Duser extends Document {
  name: string;
  email: string;
  password: string;
  profileImg?: string;
  emailVerified: boolean;
  provider: string;
  generateToken(): Promise<string>;
}

interface Muser extends Model<Duser> {
  findByCredentials(email: string, password: string): Promise<Duser>;
}
const userSchema: Schema<Duser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(value: string) {
          return validator.isEmail(value);
        },
        message: "Enter valid email",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate: {
        validator(value: string) {
          return value.toLowerCase() !== "password";
        },
        message: "Password cannot be 'password'",
      },
    },
    profileImg: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      default: "email",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const userObj = this.toObject();
  return userObj;
};

//schema to hash password
userSchema.pre<Duser>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//schema to generate token
userSchema.methods.generateToken = async function (): Promise<string> {
  const Key: string = process.env.SecretKey!;
  const token = jwt.sign({ _id: this._id.toString() }, Key, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.statics.findByCredentials = async function (
  email: string,
  password: string
): Promise<Duser> {
  const result = await this.findOne({ email: email });

  if (!result) {
    throw new Error("Email not registered!");
  }

  const isMatch = await bcrypt.compare(password, result.password);

  if (!isMatch) {
    throw new Error("Password incorrect!");
  }

  return result;
};

const User: Muser = mongoose.model<Duser, Muser>("UserData", userSchema);

export default User;
