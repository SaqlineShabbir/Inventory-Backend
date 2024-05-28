const {
  getProductsServices,
  createProductService,
  updateProductService,
  deleteProductService,
} = require('../services/product.services');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductsServices();
    res.status(200).json({
      status: 'success',
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = createProductService(req.body);
    res.status(200).json({
      status: 'success',
      message: 'data inserted successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'error creating product',
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = updateProductService(id, data);
    res.status(200).json({
      status: 'success',
      message: 'data updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'error updating product',
      error: error.message,
    });
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = deleteProductService(id);
    res.status(200).json({
      status: 'success',
      message: 'data deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'error updating product',
      error: error.message,
    });
  }
};
