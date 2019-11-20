import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  accepted_users: Array,
  from: Date,
  to: Date,
  name: String,
  description: String,
  type: String,
  accepted: Array,
  rejected: Array,
});
