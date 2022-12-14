import { Schema, models, model } from "mongoose";

const ArticleSchema = new Schema(
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

const Article = models.articles || model("articles", ArticleSchema);

export default Article;
