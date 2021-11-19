const { productRepository } = require('../repository/repository.index');



/**
 * @description Gets the all products
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: [*]}>}
 * {success: false, error: any} or {success: true, data: [products]}
 */
exports.getAllProducts = async () => {
	try {
		const products = await productRepository.getAllProducts();

		return { success: true, data: products };
	} catch (error) {
		throw { success: false, error: any };
	}
};

/**
 * @description Gets product by id
 * @param id {property} Product Id
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: product}>}
 * {success: false, error: any} or {success: true, data: {product}}
 */
exports.getProduct = async id => {
	try {
		const product = await productRepository.getProduct(id);

		return { success: true, data: product };
	} catch (error) {
		throw { success: false, error: any };
	}
};

/**
 * @description Create Product
 * @param product {object} Object containing all required fields to
 * create product
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: result}>}
 * {success: false, error: any} or {success: true}
 */
exports.createProduct = async product => {
	try {

		let result = await productRepository.createProduct(product);

		return { success: true, data: result };
	} catch (error) {
		throw { success: false, error: any };
	}
};

/**
 * @description UpdateProduct Product
 * @param product {object} Object containing all required fields to
 * update product
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data:product}>}
 * {success: false, error: any} or {success: true,data:product}
 */
exports.updateProduct = async (product) => {
	try {
		await productRepository.updateProduct(product);
		product = await this.getProduct(product.id);
		return { success: true, data: product.data };
	} catch (error) {
		throw { success: false, error: any };
	}
};



/**
 * @description DeleteProduct Product
 * @param id {property} Product Id
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean}>}
 * {success: false, error: any} or {success: true}
 */
exports.deleteProduct = async id => {
	try {
		await productRepository.deleteProduct(id);
		return { success: true };
	} catch (error) {
		throw { success: false, error: any };
	}
};





