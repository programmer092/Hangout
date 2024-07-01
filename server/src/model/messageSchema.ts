import mongoose, { Schema, SchemaType, Document, Model } from "mongoose";

interface Dmessage extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message: string;
  file?: {
    type: string;
    required: false;
  };
}

interface Mmessage extends Model<Dmessage> {}

const messageSchema: Schema<Dmessage> = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    file: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message: Mmessage = mongoose.model<Dmessage, Mmessage>(
  "Message",
  messageSchema
);

export default Message;
