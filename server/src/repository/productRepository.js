const { Product } = require('../model/product');

/**
 * @description Gets the all products
 *
 * @returns {Promise<[{products}]>}
 * product object array
 */
exports.getAllProducts = async () => {
	try {
		return Product.find();
	} catch (error) {
		throw error;
	}
};

/**
 * @description Gets the product
 * @param id {property} Product Id
 * @returns {Promise<{product}>}
 * product object
 */
exports.getProduct = async id => {
	try {
		return Product.findOne({ _id: id });
	} catch (error) {
		throw error;
	}
};

/**
 * @description Create Product
 * @param product {object} Object containing all required fields to
 * create product
 */
exports.createProduct = async product => {
	try {
		const productModel = new Product(product);
		return productModel.save();
	} catch (error) {
		throw error;
	}
};

/**
 * @description Update Product
 * @param product {object} Object containing all required fields to
 * update product
 */
exports.updateProduct = async product => {
	try {
		return await Product.updateOne({ _id: product.id }, product);
	} catch (error) {
		throw error;
	}
};

/**
 * @description Delete Product
 * @param id {property} Product Id
 */
exports.deleteProduct = async id => {
	try {
		return await Product.deleteOne({ _id: id });
	} catch (error) {
		throw error;
	}
};



