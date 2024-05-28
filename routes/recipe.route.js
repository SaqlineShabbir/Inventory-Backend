const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");

// Routes for handling recipes
router
  .route("/")
  .get(recipeController.getRecipes)
  .post(recipeController.createRecipe);

router
  .route("/:id")
  .get(recipeController.getRecipeById) // Route to get a recipe by ID
  .patch(recipeController.updateRecipe)
  .delete(recipeController.deleteRecipe);

module.exports = router;
