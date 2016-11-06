var session = require('express-session'),
	parseurl= require('parseurl');

module.exports = function( app ) {
	app.use(session({
		secret : 'mysecret',
		saveUninitialized : true,
		resave : true
	}));

	// Get page views using express session - using custom middleware
	app.use(( req, res, next )=> {
		setCurrentPageViews( req );
		next();
	});

	function setCurrentPageViews( request ) {
		var pageViews = request.session.views,
		    pathName  = parseurl( request ).pathname;

		if( !pageViews ) {
			pageViews = request.session.views = {};	
		}
		pageViews[ pathName ] = (pageViews[pathName] || 0) + 1;
		app.locals.currentPageView = request.session.views[ pathName ];
	}
}