import mongoose, { model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  org: String,
  isOrgEmail: Boolean,
  inviteCode: String,
  credits: Number,
  purchaseHistory: [
    {
      date: Date,
      credits: Number,
      plan: String,
    },
  ],
  creditsHistory: [
    {
      date: Date,
      credits: Number,
      tab: String,
      journey: String,
    },
  ],
  currentPlan: {
    type: String,
    enum: ["free", "basic", "enterprise"],
    default: "free",
  },
  interests: {
    goal: String,
    designation: String,
    skill: String,
    work: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
