const express = require('express');
const router = express.Router();
const CTRLVEFIFY= require('../middlewares/verifyController');

//Controlador
const controller = require('../controllers/user.controller');

//REGISTRO USUARIO
router.post('/register', controller.user_register);
router.get('/confirmEmail', CTRLVEFIFY.verifyToken, controller.user_confirm);
router.post('/login', controller.user_login);
router.post('/recuperarClave',  controller.user_recuperacionClave);
router.put('/recuperar', CTRLVEFIFY.verifyToken, controller.user_newContraseña);

router.put('/saved-product', CTRLVEFIFY.verifyToken, controller.user_saveProduct);
router.get('/saved-products', CTRLVEFIFY.verifyToken, controller.user_getSaveProducts);
router.put('/delete-saved-product/:id', CTRLVEFIFY.verifyToken, controller.user_deleteSaveProducto);

module.exports = router;