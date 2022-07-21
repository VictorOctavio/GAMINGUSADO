'use strict'
const express = require('express');
const morgan = require('morgan');
const createRole = require('./libs/initialSetup');

//Initializar Express
const app = express();
//Create roles
createRole();

//Settings
app.set('port', process.env.PORT || 8080);

//Cargar Rutas
const router_user = require('./routes/user.router');
const router_producto = require('./routes/producto.router');
const router_app = require('./routes/app.router');
const router_admin = require('./routes/admin.router')

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, auth-token');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Rutas
app.use('/api', router_app)
app.use('/api', router_user)
app.use('/api', router_producto)
app.use('/api', router_admin)

//Export Module
module.exports = app;
