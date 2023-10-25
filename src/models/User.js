import mongoose, { model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  image: String,
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  onboarded: { type: Boolean, default: false },
  org: String,
  isOrgEmail: Boolean,
  inviteCode: String,
  credits: Number,
  purchaseHistory: [
    {
      date: Date,
      credits: Number,
      plan: String,
      payment_data: Object,
    },
  ],
  creditsHistory: [
    {
      date: Date,
      credits: Number,
      tab: String,
      journey: String,
      type: {
        type: String,
        enum: ["add", "remove"],
      },
      purchasePlan: String,
    },
  ],
  currentPlan: {
    type: String,
    enum: ["free", "basic", "enterprise", "standard", "advanced"],
    default: "free",
  },
  interests: {
    goal: String,
    designation: String,
    skill: String,
    work: String,
  },
  total_credits_used: {
    type: Number,
    default: 0,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
