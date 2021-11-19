const { productController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
const { apiResponse, authorizer, validate } = require('../middlewares/middlewares.index');
const { productValidation } = require('../validations/validations.index');

exports.assignRoutes = app => {
	/**
	 * Get All Products
	 */
	app.get(
		requestUtil.getUrlPrefix('product'),
		authorizer.checkAuth,
		productController.getAllProducts,
		apiResponse.send
	);

	/**
	 * Get product
	 */
	app.get(
		requestUtil.getUrlPrefix('product/:id'),
		// validate(productValidation.getProduct),
		authorizer.checkAuth,
		productController.getProduct,
		apiResponse.send
	);

	/**
	 * Update Product
	 */
	app.put(
		requestUtil.getUrlPrefix('product/:id'),
		// validate(productValidation.updateProduct),
		authorizer.checkAuth,
		productController.updateProduct,
		apiResponse.send
	);

	/**
	 * Create Product
	 */
	app.post(
		requestUtil.getUrlPrefix('product'),
		// validate(productValidation.createProduct),
		authorizer.checkAuth,
		productController.createProduct,
		apiResponse.send
	);

	/**
	 * Delete Product
	 */
	app.delete(
		requestUtil.getUrlPrefix('product/:id'),
		authorizer.checkAuth,
		productController.deleteProduct
	);
};
