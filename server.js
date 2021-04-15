const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const mongojs = require("mongojs");
const routes = require("./routes");
const PORT = process.env.PORT || 3000;

const app = express();

//middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//access to public folder
app.use(express.static("public"));

// route connections
app.use(routes);

//database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
