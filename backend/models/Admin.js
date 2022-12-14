import { Schema, models, model } from "mongoose";

const AdminSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const Admin = models.admins || model("admins", AdminSchema);

export default Admin;
