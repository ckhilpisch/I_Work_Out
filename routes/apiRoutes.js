const router = require("express").Router();
const Workout = require("../models/workout");
const db = require("../models/index");

//create new workout
router.post("/workouts", ({ body }, res) => {
  console.log(body);
  Workout.create(body)
  
    .then((Workout) => {
      res.json(Workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//get last workout
router.get("/workouts", (req, res) => {
  console.log(res.body);
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(1)
    .then((latestWorkout) => {
      console.log(latestWorkout);
      res.json(latestWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//get last 7 workouts
router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//add to an existing workout
router.put("/workouts/:id", (req, res) => {
  console.log(req);
  Workout.findOneAndUpdate(
    req.params.id,
    {
      $push: {
        exercises: req.body,
      },
    },
    { new: true }
  )
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;