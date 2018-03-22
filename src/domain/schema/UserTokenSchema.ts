import { Schema } from 'mongoose';

export const UserTokenSchema: Schema = new Schema({
  email: String,
  token: String,
  validUntil: Date
});
