const express = require('express');
const controller = require('../controllers/app.controller');
const router = express.Router();

const controllerApp = require('../controllers/app.controller');

//Create Productos
router.get('/app/productos', controllerApp.get_app_productos);
router.get('/app/producto/:id', controllerApp.get_app_producto);
router.get('/app/search', controllerApp.search_productos);
router.post('/app/new-sub', controllerApp.new_sub);
router.post('/app/filter-precio', controller.filter_precio);
router.post('/app/contacto', controller.contacto);

module.exports = router;