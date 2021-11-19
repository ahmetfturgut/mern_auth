const Status = require('http-status');
const { productService } = require('../service/service.index');

exports.getAllProducts = async (req, res, next) => {
	try {
		const result = await productService.getAllProducts();

		res.apiResponse = {
			status: Status.OK,
			success: result.success,
			error: result.error,
			data: result.data,
			message: 'Succesfull'
		};
	} catch (error) {
		res.apiResponse = {
			status: Status.BAD_REQUEST,
			success: false,
			error: error.message,
			data: null,
			message: 'Error'
		};
	}

	next();
};

exports.getProduct = async (req, res, next) => {
	try {
		const result = await productService.getProduct(req.params.id);

		res.apiResponse = {
			status: Status.OK,
			success: result.success,
			error: result.error,
			data: result.data,
			message: 'Succesfull'
		};
	} catch (error) {
		res.apiResponse = {
			status: Status.BAD_REQUEST,
			success: false,
			error: error.message,
			data: null,
			message: 'Error'
		};
	}

	next();
};

exports.createProduct = async (req, res, next) => {
	try {
		const { productName, productDetail, } = req.body;
		const result = await productService.createProduct({ productName, productDetail });

		if (!result.success) {
			res.apiResponse = {
				status: Status.NOT_ACCEPTABLE,
				success: result.success,
				message: result.error
			};
		} else {
			res.apiResponse = {
				status: Status.OK,
				success: result.success,
				message: 'Succesfull',
				data:result.data
			};
		}
	} catch (error) {
		res.apiResponse = {
			status: Status.BAD_REQUEST,
			success: false,
			error: error.message,
			data: null,
			message: 'Error'
		};
	}

	next();
};

exports.updateProduct = async (req, res, next) => {
	try {
		const data = req.body;
		const result = await productService.updateProduct(data);

		res.apiResponse = {
			status: Status.OK,
			success: result.success,
			error: result.error,
			data: result.data,
			message: 'Succesfull'
		};
	} catch (error) {
		res.apiResponse = {
			status: Status.BAD_REQUEST,
			success: false,
			error: error.message,
			data: null,
			message: 'Error'
		};
	}

	next();
};

exports.deleteProduct = async (req, res, next) => {
	try {
		const data = req.params;
		const result = await productService.deleteProduct(data);

		res.apiResponse = {
			status: Status.OK,
			success: result.success,
			error: result.error,
			data: result.data,
			message: 'Succesfull'
		};
	} catch (error) {
		res.apiResponse = {
			status: Status.BAD_REQUEST,
			success: false,
			error: error.message,
			data: null,
			message: 'Error'
		};
	}

	next();
};
