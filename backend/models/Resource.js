import { Schema, models, model } from "mongoose";

const ResourceSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Resource = models.resources || model("resources", ResourceSchema);

export default Resource;
