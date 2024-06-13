const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controlller");

// Routes for handling events
router
  .route("/")
  .get(eventController.getEvents)
  .post(eventController.createEvent);

router
  .route("/:id")
  .get(eventController.getEventById) // Route to get a event by ID
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
