const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getProduct = {
	params: Joi.object().keys({
		id: Joi.string()
			.required()
			.custom(objectId)
	})
};

const updateProduct = {

	body: Joi.object().keys({
		id: Joi.string()
			.required()
			.custom(objectId),
		productDetail: Joi.string()
			.required(),
		productName: Joi.string().required()
	})
};

const createProduct = {
	body: Joi.object().keys({
		productDetail: Joi.string()
			.required(),
		productName: Joi.string().required()
	})
};

const deleteProduct = {
	params: Joi.object().keys({
		id: Joi.string()
			.required()
			.custom(objectId)
	})

};

module.exports = {
	getProduct,
	updateProduct,
	createProduct,
	deleteProduct
};
