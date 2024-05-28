const {
  getCategoryServices,
  createCategoryService,
} = require("../services/category.servies");

exports.getCategories = async (req, res, next) => {
  try {
    const products = await getCategoryServices();
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

exports.createCategory = async (req, res, next) => {
  try {
    const result = createCategoryService(req.body);
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

//   exports.updateRecipe = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const data = req.body;
//       const result = updateRecipesService(id, data);
//       res.status(200).json({
//         status: "success",
//         message: "data updated successfully",
//         data: result,
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         message: "error updating product",
//         error: error.message,
//       });
//     }
//   };
//   exports.deleteRecipe = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const result = deleteRecipesService(id);
//       res.status(200).json({
//         status: "success",
//         message: "data deleted successfully",
//         data: result,
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         message: "error updating product",
//         error: error.message,
//       });
//     }
//   };
