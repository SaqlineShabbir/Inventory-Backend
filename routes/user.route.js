const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controoller");
const { verifyToken } = require("../nFunctions/auth");

router.route("/").post(userController.createUser);

router
  .route("/:id")
  .get(verifyToken, userController.getUserById)
  .patch(verifyToken, userController.updateUser);

router.post("/login", userController.login);

module.exports = router;
