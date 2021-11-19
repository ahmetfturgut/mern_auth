const app = require('./express');
const mongoose = require('./mongoose');
const initiatoryManager = require('./initiatoryManager');
const { config } = require('../config/config');

 
mongoose.connect();
initiatoryManager.initializeData();
// listen to requests
app.listen(config.api_config.api_port, () =>
	console.log(
		`%cAPI Running on: ${config.api_config.api_host}:${config.api_config.api_port}${config.api_config.api_base_url}`,
		'color: green'
	)
);

/**
 * Exports express
 * @public
 */
module.exports = app;
