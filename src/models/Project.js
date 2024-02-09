import mongoose, { model, models } from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    index: String,
    reselect: {
      type: Boolean,
      default: false,
    },
    sharable: {
      type: Boolean,
      default: false,
    },
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
