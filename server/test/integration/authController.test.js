const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../src/loaders/express');
const userRepository = require('../../src/repository/userRepository');
const { config } = require('../../src/config/config');
const { cryptUtil } = require('../../src/utils/utils.index');
const setupTestDBAndConnection = require('../utils/setupTestDBAndConnection');

setupTestDBAndConnection();

// app.listen(config.api_config.api_port, () =>
// 	console.log(
// 		`%cAPI Running on: ${config.api_config.api_host}:${config.api_config.api_port}${config.api_config.api_base_url}`,
// 		'color: green'
// 	)
// );

describe('Authentication API', () => {
	 

 

	describe('POST /api/v1/auth/login', () => {
		let loginUser;

		beforeEach(async () => {
			loginUser = {
				email: 'user1@user.com',
				password: '123qweQWE@'
			};
		});

		it('should return an token when email and password matches', done => {
			debugger;
			request(app)
				.post('/api/v1/auth/login')
				.send(loginUser)
				.expect(httpStatus.OK)
				.end((err, res) => {
					console.log("data=>" + res.body.data.token);
					expect(res.body).to.have.a.property('success');
					expect(res.body).to.have.a.property('message');
					expect(res.body).to.have.a.property('data');
					expect(res.body.data).to.have.a.property('token');
					const { message } = res.body;
					const { success } = res.body;
					const { data } = res.body;
					expect(success).to.be.equal(true);
					expect(message).to.include('Succesfull');
					expect(data).to.not.equal(null);
					expect(data).to.not.equal(undefined);
					expect(data.token).to.not.equal(null);
					expect(data.token).to.not.equal(undefined);
					done(err);
				});
		});
	});
	describe('POST /api/v1/auth/login Invalid Inputs', () => {
		let loginUser;

		beforeEach(async () => {
			loginUser = {
				email: 'barneyStinson@gmail.com',
				password: '123ljkD3ed'
			};
		});

		it('should report error when email and password are not provided', done => {
			request(app)
				.post('/api/v1/auth/login')
				.send({})
				.expect(httpStatus.UNPROCESSABLE_ENTITY)
				.end((err, res) => {
					expect(res.body).to.have.a.property('errors');
					const { errors } = res.body;
					expect(errors).length.greaterThan(0);
					expect(errors.some(x => x.message.includes('"email" is required'))).to.be.equal(true);
					expect(errors.some(x => x.message.includes('"password" is required'))).to.be.equal(true);
					done(err);
				});
		});

		it('should report error when the email provided is not valid', done => {
			loginUser.email = 'this_is_not_an_email';
			request(app)
				.post('/api/v1/auth/login')
				.send(loginUser)
				.expect(httpStatus.UNPROCESSABLE_ENTITY)
				.end((err, res) => {
					expect(res.body).to.have.a.property('errors');
					const { errors } = res.body;
					expect(errors).length.greaterThan(0);
					expect(errors[0].message).to.include('"email" must be a valid email');
					done(err);
				});
		});

		it("should report error when email and password don't match", done => {
			loginUser.password = '123123wer4';
			request(app)
				.post('/api/v1/auth/login')
				.send(loginUser)
				.expect(httpStatus.NOT_FOUND)
				.end((err, res) => {
					expect(res.body).to.have.a.property('success');
					expect(res.body).to.have.a.property('message');
					const { message } = res.body;
					const { success } = res.body;
					expect(success).to.be.equal(false);
					expect(message).to.include('Wrong email or password');
					done(err);
				});
		});
	});
});
