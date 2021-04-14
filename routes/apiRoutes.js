const router = require("express").Router();

const Workout = require("../models/workout");

//create new workout
router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//get last workout
router.get("/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "exercise.duration"}
      }
    }
  ])
  .sort({ "day": -1}).limit(1)
  .then(latestWorkout => {
    res.json(latestWorkout)
  })
});

//get last 7 workouts
router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercise.duration" }
      }

    },
  ])
  .sort({ _id : -1 }).limit(7)
  .then(workoutRange => {
    res.json(workoutRange);
  })
  .catch(err => {
    res.json(err);
  });
});

//add to an existing workout
router.put("/workouts/:id", ({ body, params }, res) => {
  Workout.findOneAndUpdate(params.id, 
    { $push: { exercise: body } }, 
    { new: true })
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
