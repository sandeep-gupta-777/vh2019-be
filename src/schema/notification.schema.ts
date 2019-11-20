import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  user_id: String,
  message: String,
  details: String,
  time: String,
  read: Boolean,
});
