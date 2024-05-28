const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const mongoose = require("mongoose");

// Database connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection is successful".green);
  })
  .catch((err) => {
    console.error("Database connection error:".red, err);
    process.exit(1); // Exit process with failure
  });

// Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
