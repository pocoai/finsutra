import mongoose, { model, models } from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    // Unique identifier for the invitation
    invitationCode: {
      type: String,
      required: true,
      unique: true,
    },
    // User who sent the invitation
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    // Email of the person invited
    invitedEmail: {
      type: String,
      required: true,
    },
    // Additional information about the invitation, if needed
    // For example, you can include the date of the invitation
    // or any custom data related to the invitation.
    invite_status: {
      type: String,
      enum: ["accepted", "pending"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    // Timestamps for when the invitation was created and updated
  },
  {
    timestamps: true,
  }
);

const Invitation = models.Invitation || model("Invitation", invitationSchema);

export default Invitation;
