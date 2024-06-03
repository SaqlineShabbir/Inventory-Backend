const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { verifyToken } = require("../nFunctions/auth");

router
  .route("/")
  .get(verifyToken, productController.getProducts)
  .post(verifyToken, productController.createProduct);

router
  .route("/:id")
  .patch(verifyToken, productController.updateProduct)
  .delete(verifyToken, productController.deleteProduct);

module.exports = router;
