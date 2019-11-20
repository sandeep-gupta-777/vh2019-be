import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  id: String,
  email: String,
  createdAt: String,
  updatedAt: String,
  bio: String,
  image: String,
  token: String,
  idToken: String,
  name: String,
  provider: String,
  password: String,
});
