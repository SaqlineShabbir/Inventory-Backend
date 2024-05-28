const Product = require("../models/Recipe");

exports.getRecipesServices = async () => {
  const products = await Product.find({});
  return products;
};
exports.createRecipesService = async (data) => {
  const product = await Product.create(data);
  return product;
};
exports.updateRecipesService = async (id, data) => {
  const result = await Product.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return result;
};
exports.deleteRecipesService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
