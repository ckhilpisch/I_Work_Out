const router = require("express").Router();

const Workout = require("../models/workout");

router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercise.duration" }
      }

    },
  ])
  .sort({ _id : -1 }).limit(7)
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.json(err);
  });
});

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
