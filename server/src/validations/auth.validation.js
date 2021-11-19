const Joi = require('joi');
const { password } = require('./custom.validation');

const login = {
	body: Joi.object()
		.keys({
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string()
				.required()
				.custom(password)
		})
		.options({ abortEarly: false })
};

   

module.exports = {
	login
};
