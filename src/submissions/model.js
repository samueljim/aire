const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  question: {
    type: Number,
    required: true,
  },
  submissionTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  correct: {
    type: Boolean,
    required: true,
    default: false,
  },
});

mongoose.model("Submissions", SubmissionsSchema);
