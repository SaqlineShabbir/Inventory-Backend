const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controoller");
const { verifyToken } = require("../nFunctions/auth");

router.route("/").post(userController.createUser);
router.route("/google").post(userController.GoogleLogin);

router
  .route("/:id")

  .patch(verifyToken, userController.updateUser);

router.post("/login", userController.login);
router.get("/:email", userController.getUserByEmail);

module.exports = router;
