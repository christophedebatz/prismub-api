import { Schema } from 'mongoose';

export const CommitSchema: Schema = new Schema({
  message: String,
  userName: String,
  userEmail: String,
  repositoryId: Number,
  createdAt: Date
});
