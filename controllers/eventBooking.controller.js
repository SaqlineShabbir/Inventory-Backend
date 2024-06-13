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
    const eventBooking = await EventBooking(req.body);
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
exports.deleteEvent = async (req, res, next) => {
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
