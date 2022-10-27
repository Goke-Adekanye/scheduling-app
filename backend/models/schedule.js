const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema(
  {
    date: { type: String },
    time: { type: String, maxlength: 8 },
    day: { type: Number },
    yearMonth: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Schedule', ScheduleSchema);
