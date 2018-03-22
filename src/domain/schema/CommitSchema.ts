import { Schema } from 'mongoose';

export const CommitSchema: Schema = new Schema({
  description: String,
  repository: String,
  commiter: String,
  email: String,
  createdAt: Date
});
