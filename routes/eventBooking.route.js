const express = require("express");
const router = express.Router();
const eventBookingController = require("../controllers/eventBooking.controller");
const { verifyToken } = require("../nFunctions/auth");
// Routes for handling booking
router
  .route("/")
  .get(verifyToken, eventBookingController.getEventBooking)
  .post(verifyToken, eventBookingController.BookEvent);

router
  .route("/:id")
  //   .get(eventBookingController.getEventById)
  //   .patch(eventBookingController.updateEvent)
  .delete(eventBookingController.deleteEventBooking);

// New route for getting bookings by user ID
router
  .route("/:userId")
  .get(verifyToken, eventBookingController.getEventBookingByUserId);

module.exports = router;
