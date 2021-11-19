const mongoose = require('mongoose');
const { config } = require('../../src/config/config');

const setupTestDBAndConnection = () => {
	before(async () => {
		await mongoose.connect(config.db_config.connStr, {
			useNewUrlParser: true,
			autoIndex: false,
			useUnifiedTopology: true
		});

		console.log(`%cMongo connection created: ${config.db_config.connStr}`, 'color: green');


		await Promise.all(
			Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany())
		);
		console.log(`%cMongo collections content cleaned`, 'color: green');
	});


	after(async () => {
		await mongoose.disconnect();
		console.log(`%cMongo disconnected`, 'color: green');

		
	});
};

module.exports = setupTestDBAndConnection;
