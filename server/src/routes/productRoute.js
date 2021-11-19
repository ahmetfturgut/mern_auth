const { productController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
const { apiResponse, authorizer, validate } = require('../middlewares/middlewares.index');
const { productValidation } = require('../validations/validations.index');

exports.assignRoutes = app => {
	/**
	 * Get All Products
	 */
	app.get(
		requestUtil.getUrlPrefix('product/getAllProduct'),
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
		requestUtil.getUrlPrefix('product/update/:id'),
		// validate(productValidation.updateProduct),
		authorizer.checkAuth,
		productController.updateProduct,
		apiResponse.send
	);

	/**
	 * Create Product
	 */
	app.post(
		requestUtil.getUrlPrefix('product/create'),
		// validate(productValidation.createProduct),
		authorizer.checkAuth,
		productController.createProduct,
		apiResponse.send
	);

	/**
	 * Delete Product
	 */
	app.delete(
		requestUtil.getUrlPrefix('product/delete/:id'),
		authorizer.checkAuth,
		productController.deleteProduct,
		apiResponse.send
	);
};
