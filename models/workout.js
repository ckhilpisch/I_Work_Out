const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "Enter the type of exercise"
  },
  name: {
    type: String,
    trim: true,
    required: "Enter a name for the exercise"
  },
  duration: {
    type: Number,
    required: "Enter the time spent"
  },
  distance: {
    type: Number,
    required: "Enter the distance covered"
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

const workout = mongoose.model("workout", workoutSchema);

db.workout.aggregate ( [
  {
    $addFields: {
      totalWeight: { $muliply: ["$weight", "$rep", "$set"] }
    }
  },
  {
    $addFields: {
      totalDistance:
      { $sum: ["$distance"]}
    }
  }
  
])

module.exports = workout;