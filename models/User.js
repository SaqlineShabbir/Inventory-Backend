const mongoose = require("mongoose");

// Define user schema
const userSchema = mongoose.Schema(
  {
    // Name field
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: [2, "Name must be at least 2 characters long"],
      maxLength: [100, "Name cannot exceed 100 characters"],
      trim: true,
    },
    // Email field
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      unique: true,
    },
    // Password field
    password: {
      type: String,
    },
    // Image field (optional)
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
