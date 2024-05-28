const Recipe = require("../models/Recipe");
const {
  getRecipesServices,
  createRecipesService,
  updateRecipesService,
  deleteRecipesService,
} = require("../services/recipe.services");

exports.getRecipes = async (req, res, next) => {
  try {
    const products = await getRecipesServices();
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    console.log(recipeId);
    const recipe = await Recipe.findById(recipeId);
    res.status(200).json({
      status: "success",
      data: recipe,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    const result = createRecipesService(req.body);
    res.status(200).json({
      status: "success",
      message: "data inserted successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "error creating product",
    });
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = updateRecipesService(id, data);
    res.status(200).json({
      status: "success",
      message: "data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "error updating product",
      error: error.message,
    });
  }
};
exports.deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = deleteRecipesService(id);
    res.status(200).json({
      status: "success",
      message: "data deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "error updating product",
      error: error.message,
    });
  }
};
