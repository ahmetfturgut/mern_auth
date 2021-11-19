const { productRoute, authRoute } = require('./routes.index'); 

exports.assignRoutes = app => { 
	productRoute.assignRoutes(app);
	authRoute.assignRoutes(app);
};
