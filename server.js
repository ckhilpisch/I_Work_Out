const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

//middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//access to public folder
app.use(express.static("public"));

// route connections
app.use(require("./routes/apiRoutes"));
app.use(require("./routes/homeRoutes"));

//database connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

//double check the mongoDB connection
const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Database Error:", error);
});

//server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
