var express = require('express'),
	morgan  = require('morgan'), // for logging, specially on dev environment
	port 	= process.env.PORT || 3000,
	app 	= express(); // creating the app

/* Middlewares - app.use - they execute sequentially */
app.use(morgan('dev'));

app.use('/', function( req, res, next) {
	res.send('Welcome to Express world!');
});

app.listen( port, ()=> {
	console.log('Server started listening at ' + port );
})