var express = require('express'),
	morgan  = require('morgan'), // for logging, specially on dev environment
	port 	= process.env.PORT || 3000,
	app 	= express(); // creating the app

/* Middlewares - app.use - they execute sequentially */
app.use(morgan('dev'));

require('./app/session')( app );// I should have write ./app/session/{filename}.js, by default it looks for index.js

app.use('/test', ( req, res, next)=> {
	res.send('Welcome to Express world! You have visited this page ' + app.locals.currentPageView + ' times');
});

app.listen( port, ()=> {
	console.log('Server started listening at ' + port );
})