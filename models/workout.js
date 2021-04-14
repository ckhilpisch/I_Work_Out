const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
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
}],
});
//working on the aggregates to add up total weight and total duration
// db.workout.aggregate ([
//   {
//     $addFields: { 
//       totalWeight: { $sum: ["$weight"]}}
//   },
//   {
//     $addFields: {
//       totalDuration:
//       { $sum: ["$duration"]}
//     }
//   }
  
// ])
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;