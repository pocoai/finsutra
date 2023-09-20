import mongoose, { model, models } from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uid: String,
    query: {
      type: String,
      default: "",
    },
    queryResults: Array,
    currentJourney: Number,
    currentStage: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
    },
    journey1: mongoose.Schema.Types.Mixed,
    journey2: mongoose.Schema.Types.Mixed,
    journey3: mongoose.Schema.Types.Mixed,
    journey4: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
