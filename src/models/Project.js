import mongoose, { model, models } from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
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
    reselect: {
      type: Boolean,
      default: false,
    },
    sharable: {
      type: Boolean,
      default: false,
    },
    minigator: {
      index: String,
      lastUpdated: Date,
    },
    journey1: mongoose.Schema.Types.Mixed,
    journey2: mongoose.Schema.Types.Mixed,
    journey3: mongoose.Schema.Types.Mixed,
    journey4: mongoose.Schema.Types.Mixed,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
