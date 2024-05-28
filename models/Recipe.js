const mongoose = require("mongoose");
//schema design
const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: [1, "Minimum one word required"],
      maxLength: [100, "Too large"],
      trim: true,
    },
    description: {
      type: "string",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    image: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//Model
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
