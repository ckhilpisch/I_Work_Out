const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardioSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for the cardio exercise"
  },
  duration: {
    type: Number,
    required: "Enter the time spent"
  },
  distance: {
    type: Number,
    required: "Enter the distance covered"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const cardio = mongoose.model("cardio", cardioSchema);

module.exports = cardio;
