const mongoose = require('mongoose');

const { toJSON } = require('./plugins/plugins.index');

const { Schema } = mongoose;

const ProductSchema = new Schema({
	productName: {
		type: String,
		required: true
	},
	productDetail: {
		type: String
	},
	createdDateTime: {
		type: Date,
		default: Date.now
	},
	updatedDateTime: {
		type: Date,
		default: Date.now
	},

});

ProductSchema.plugin(toJSON);

ProductSchema.pre('updateOne', function (next) {
	this._update.updatedDateTime = new Date();
	next();
});

const Product = mongoose.model('product', ProductSchema);

exports.Product = Product;
