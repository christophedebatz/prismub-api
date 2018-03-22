import { Schema } from 'mongoose';

export const RepositorySchema: Schema = new Schema({
  name: String,
  owner: String,
  description: String,
  pictureUrl: String,
  createdAt: Date
});
