import mongoose from "mongoose";

const MinigatorChatsSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  messages: [
    {
      type: {
        type: String,
        enum: ["api", "user"],
      },
      message: String,
      timestamp: Date,
    },
  ],
});

const MinigatorChats =
  mongoose.models.MinigatorChats || mongoose.model("MinigatorChats", MinigatorChatsSchema);

export default MinigatorChats;
