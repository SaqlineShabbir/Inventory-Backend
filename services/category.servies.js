const Category = require("../models/category");

exports.getCategoryServices = async () => {
  const actegories = await Category.find({});
  return actegories;
};
exports.createCategoryService = async (data) => {
  const actegory = await Category.create(data);
  return actegory;
};
// exports.updateRecipesService = async (id, data) => {
//   const result = await Product.updateOne(
//     { _id: id },
//     { $set: data },
//     { runValidators: true }
//   );
//   return result;
// };
// exports.deleteRecipesService = async (id) => {
//   const result = await Product.deleteOne({ _id: id });
//   return result;
// };
