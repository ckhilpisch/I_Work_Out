const router = require("express").Router();
const db = require("../models");

//create new workout
router.post("/workouts", (req, res) => {
  db.Workout.create({})

    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//add to an existing workout
router.put("/workouts/:id", (req, res) => {
  console.log(req);
  db.Workout.findByIdAndUpdate(
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

//get last workout
router.get("/workouts", (req, res) => {
  console.log(res.body);
  db.Workout.aggregate([
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
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ date: -1 })
    .limit(7)
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
