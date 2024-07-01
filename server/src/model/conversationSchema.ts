import mongoose, { Document, Model } from "mongoose";
import { Schema } from "mongoose";

interface Dconversation extends Document {
  participants: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
  file?: String[];
}

interface Mconversation extends Model<Dconversation> {}

const conversationSchema: Schema<Dconversation> = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
      },
    ],

    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],

    file: [
      {
        type: String,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation: Mconversation = mongoose.model<
  Dconversation,
  Mconversation
>("Conversation", conversationSchema);

export default Conversation;
