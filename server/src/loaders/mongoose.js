const mongoose = require('mongoose');
const { config } = require('../config/config');

 

mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', err => {
	console.log(`%cError creating db connection: ${err}`, 'color: red');
	process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
	mongoose
		.connect(config.db_config.connStr, {
			useCreateIndex: true,
			keepAlive: 1,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		.then(() => console.log(`%cMongo connection created: ${config.db_config.connStr}`, 'color: green'));
	return mongoose.connection;
};
