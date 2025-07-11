import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  password: string;
  role?: string;
  verified?: boolean;
  verificationToken?: string;
}

const UsersSchema: Schema<IUser> = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
  },
  { timestamps: true }
);

export const TaskUsers = mongoose.model<IUser>("TaskUsers", UsersSchema);
