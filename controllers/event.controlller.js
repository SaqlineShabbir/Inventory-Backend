const Event = require("../models/Event");

// Get all events
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      status: "success",
      data: events,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// Get an event by ID
exports.getEventById = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Event not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// Create a new event
exports.createEvent = async (req, res, next) => {
  try {
    console.log(req.body);
    const newEvent = await Event.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error creating event",
      error: error.message,
    });
  }
};

// Update an event
exports.updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({
        status: "fail",
        message: "Event not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error updating event",
      error: error.message,
    });
  }
};

// Delete an event
exports.deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({
        status: "fail",
        message: "Event not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error deleting event",
      error: error.message,
    });
  }
};
