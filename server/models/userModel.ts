import mongoose, { Schema } from 'mongoose';

import { User } from "../../types/interfaces";

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageURL: { type: String, required: true },
  refreshToken: { type: String },
  lastLoggedIn: { type: String }
});

export default mongoose.model('User', userSchema);