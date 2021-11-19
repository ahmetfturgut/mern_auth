const { userRepository } = require('../repository/repository.index');
const { cryptUtil } = require('../utils/utils.index');
const { stateEnums,userEnums } = require('../model/enums/enums.index'); 
 
/**
 * @description Gets user by id
 * @param id {property} User Id
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: user}>}
 * {success: false, error: any} or {success: true, data: {user}}
 */
exports.getUser = async id => {
	try {
		const user = await userRepository.getUser(id);

		return { success: true, data: user };
	} catch (error) {
		throw { success: false, error: any };
	}
};

/**
 * @description Create User
 * @param user {object} Object containing all required fields to
 * create user
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean}>}
 * {success: false, error: any} or {success: true}
 */
exports.createUser = async user => {
	try {
		const existUser = await userRepository.getUserByEmail(user.email);

		if (existUser) return { success: false, error: 'This email is in use' };

		await userRepository.createUser(user);

		return { success: true };
	} catch (error) {
		throw { success: false, error: any };
	}
};
 

/**
 * @description Authenticate user by email and password
 * @param email {property} Email
 * @param password {property} Password
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: user}>}
 * {success: false, error: any} or {success: true, data: {user}}
 */
exports.authenticateUser = async (email, password) => {
	try {
		const user = await userRepository.getUserByEmail(email);

		if (!user || user.state !== stateEnums.UserState.Active) return { success: false };

		const pswDto = {
			hashPassword: user.password,
			salt: user.salt,
			password
		};

		const isMatch = cryptUtil.verifyHash(pswDto);

		if (!isMatch) return { success: false };

		let isAdmin = user.role == userEnums.UserRole.Admin;
		
		const token = cryptUtil.createToken({
			userId: user.id,
			name: user.name,
			email: user.email,
			isAdmin: isAdmin
		});


		return {
			success: true,
			data: {
				name: user.name,
				email: user.email,
				token,
				isAdmin
			}
		};
	} catch (error) {
		throw { success: false, error };
	}
};
