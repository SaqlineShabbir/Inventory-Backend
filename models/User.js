const mongoose = require("mongoose");
//schema design
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: [2, "Minimum one word required"],
      maxLength: [100, "Too large"],
      trim: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
    },
  },
  {
    timestamps: true,
  }
);
//Model
const User = mongoose.model("User", userSchema);
module.exports = User;
