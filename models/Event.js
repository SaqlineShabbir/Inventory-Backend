const mongoose = require("mongoose");
//schema design
const eventSchema = mongoose.Schema(
  {
    name: {
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
    isFree: {
      type: "boolean",
      required: true,
    },
    photo: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//Model
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
