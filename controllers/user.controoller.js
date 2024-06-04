const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createToken } = require("../nFunctions/auth");
// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET_KEY; // Replace with your actual secret key

// Get user by ID
exports.getUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

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
    console.log(email);

    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If email exists, send error response
      return res.status(400).json({
        status: "fail",
        message: "User already exists with this email",
      });
    }

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

//google login

exports.GoogleLogin = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    console.log(email);

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      // If email exists, generate a JWT token and log in the user
      const token = createToken(existingUser);
      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token,
        data: existingUser,
      });
    }

    // Create user without a password since it's a Google login
    const user = await User.create({
      email,
      name,
    });

    // Generate a JWT token for the new user
    const token = createToken(user);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
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
