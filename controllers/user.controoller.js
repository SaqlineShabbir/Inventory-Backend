const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createToken } = require("../nFunctions/auth");
// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET_KEY; // Replace with your actual secret key

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with hashed password
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error creating user",
      error: err.message,
    });
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await User.updateOne(
      { _id: id },
      { $set: data },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Login functionality
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const token = createToken(user);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error logging in",
      error: error.message,
    });
  }
};
