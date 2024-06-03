const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

const productRoute = require("./routes/product.route");
const recipeRoute = require("./routes/recipe.route");
const userRoute = require("./routes/user.route");
app.get("/", (req, res, next) => {
  res.send("get route working");
});

//posting and getting from database
app.use("/api/v1/product", productRoute);
app.use("/api/v1/recipe", recipeRoute);
app.use("/api/v1/user", userRoute);

module.exports = app;
