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
    query: String,
    queryResults: Array,
    currentJourney: Number,
    currentStage: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
    },
    journey1: Object,
    journey2: Object,
    journey3: Object,
    journey4: Object,
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
