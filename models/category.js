const mongoose = require("mongoose");
//schema design
const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: [1, "Minimum one word required"],
      maxLength: [100, "Too large"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
//Model
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
