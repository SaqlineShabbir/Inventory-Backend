const EventBooking = require("../models/EventBooking");

// Get all eventbooking
exports.getEventBooking = async (req, res, next) => {
  try {
    const eventBooking = await EventBooking.find();
    res.status(200).json({
      status: "success",
      data: eventBooking,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// book event
exports.BookEvent = async (req, res, next) => {
  try {
    const eventBooking = await EventBooking.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Event booked successfully",
      data: eventBooking,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error creating event",
      error: error.message,
    });
  }
};

// Delete an booking
exports.deleteEventBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEventBooking = await EventBooking.findByIdAndDelete(id);
    if (!deletedEventBooking) {
      return res.status(404).json({
        status: "fail",
        message: "Event not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Event deleted successfully",
      data: deletedEventBooking,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error deleting event",
      error: error.message,
    });
  }
};

exports.getEventBookingByUserId = async (req, res, next) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Query the database for bookings associated with the user ID
    const bookings = await EventBooking.find({ user: userId })
      .populate("user") // Populate the 'user' field
      .populate("event"); // Populate the 'event' field

    // If no bookings found
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user ID" });
    }

    // Return the populated bookings in the response
    return res.status(200).json(bookings);
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
