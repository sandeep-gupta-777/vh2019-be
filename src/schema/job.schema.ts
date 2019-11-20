import * as mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema({

  matchingPercentage: Number,
  new: Boolean,
  id: Number,
  position: String,
  appliedTime: String,
  appliedBy: String,
  favorite: Boolean,
  type: Number,
  url: String,
  companyName: String,
  skills: Object,
  interviews: Array,
  image: String,
  scheduledInterviews: Array,
  city: String,
  country: String,
  apply: Array,
  interview: Array,
  offer: Array,
  hire: Array,
});

