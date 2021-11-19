const mongoose = require('mongoose');

const { stateEnums, userEnums } = require('./enums/enums.index');
const { cryptUtil } = require('../utils/utils.index');
const { toJSON } = require('./plugins/plugins.index');

const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	state: {
		type: String,
		enum: [
			stateEnums.UserState.Active,
			stateEnums.UserState.Blocked,
			stateEnums.UserState.NotVerified,
			stateEnums.UserState.Passive,
			stateEnums.UserState.Suspended
		],
		default: stateEnums.UserState.NotVerified
	},
	createdDateTime: {
		type: Date,
		default: Date.now
	},
	updatedDateTime: {
		type: Date,
		default: Date.now
	},
	salt: {
		type: String
	},
	role: {
		type: String,
		default: userEnums.UserRole.User
	}
});

UserSchema.plugin(toJSON);

UserSchema.pre('save', function (next) {
	const user = this;
	if ((this.isModified('password') || this.isNew) && user.password) {
		const salt = cryptUtil.generateSalt();
		const hash = cryptUtil.hash(user.password, salt);

		user.password = hash;
		user.salt = salt;

		next();
	} else {
		return next();
	}
});

UserSchema.pre('updateOne', function (next) {
	this._update.updatedDateTime = new Date();
	next();
});

const User = mongoose.model('user', UserSchema);

exports.User = User;
