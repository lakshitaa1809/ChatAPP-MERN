import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
  uid: String,
  roomId: String,
});
export default mongoose.model("Messages", chatSchema);
