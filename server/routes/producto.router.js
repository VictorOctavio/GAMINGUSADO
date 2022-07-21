const express = require('express');
const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');
//Initiaalizar Router
const router = express.Router();
//Controlador
const controller = require('../controllers/producto.controller');
//Rutas protegidas
const verifyController = require('../middlewares/verifyController');


//Multer Config
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
})
const configMulter = multer({storage}).array('images', 6);


//Obtener productos usuario
router.get('/productos',  verifyController.verifyToken, controller.get_productos);
//Crear productos user
router.post('/save-producto', verifyController.verifyToken, configMulter, controller.save_producto);
router.put('/update-producto/:id', verifyController.verifyToken , controller.update_producto);
router.delete('/delete-producto/:id', verifyController.verifyToken , controller.delete_producto);

module.exports = router;