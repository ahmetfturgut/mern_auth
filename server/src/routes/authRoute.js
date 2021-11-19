const { authController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
const { apiResponse, validate } = require('../middlewares/middlewares.index');
const { authValidation } = require('../validations/validations.index');

exports.assignRoutes = app => {
	/**
	 * Login
	 */
	app.post(
		requestUtil.getUrlPrefix('auth/login'),
		// validate(authValidation.login),
		authController.login,
		apiResponse.send
	);  

	/**
	 * Register User
	 */
	app.post(
		requestUtil.getUrlPrefix('auth/register'),
		validate(authValidation.register),
		authController.register,
		apiResponse.send
	);

 
};
