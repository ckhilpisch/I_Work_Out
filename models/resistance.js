const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resistanceSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for the resistance exercise"
  },
  duration: {
    type: Number,
    required: "Enter the time spent"
  },
  weight: {
    type: Number,
    required: "Enter the weight used"
  },
  reps: {
    type: Number,
    required: "Enter the number of reps"
  },
  set: {
    type: Number,
    required: "Enter the number of sets"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const resistance = mongoose.model("resistance", resistanceSchema);

module.exports = resistance;