import mongoose, { Schema } from 'mongoose';

import { Session } from "../../types/interfaces";

const sessionSchema = new Schema<Session>({
  cookieId: { type: String, required: true, unique: true },
  // createdAt: { type: Date, expires: 1200, default: Date.now }
});

export default mongoose.model('Session', sessionSchema);