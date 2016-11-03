var express = require('express'),
	morgan  = require('morgan'), // for logging, specially on dev environment
	port 	= process.env.PORT || 3000,
	session = require('express-session'),
	parseurl= require('parseurl'),
	app 	= express(); // creating the app

/* Middlewares - app.use - they execute sequentially */
app.use(morgan('dev'));

app.use(session({
	secret : 'mysecret',
	saveUninitialized : true,
	resave : true
}));

//Get page views using express session - using custom middleware
app.use(function( req, res, next ) {
	var pageViews = req.session.views,
	    pathName  = parseurl( req ).pathname;

	if( !pageViews ) {
		pageViews = req.session.views = {};	
	}
	pageViews[ pathName ] = (pageViews[pathName] || 0) + 1;
	next();
});

app.use('/', function( req, res, next) {
	res.send('Welcome to Express world! You visited this page ' + req.session.views['/'] + ' times');
});

app.listen( port, ()=> {
	console.log('Server started listening at ' + port );
})