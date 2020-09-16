const mongoose = require('mongoose');

const requiredNumber = {
  type: Number,
  required: true,
};

const LogEntrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: String,
    comment: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    visitDate: {
      required: true,
      type: Date,
    },
  },
  { timestamps: true },
);

const LogEntry = mongoose.model('LogEntry', LogEntrySchema);

module.exports = LogEntry;
