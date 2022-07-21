'use strict'
const Producto = require('../models/producto');
const fs = require('fs-extra');

const cloudinary = require('cloudinary');
//Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const controller = {

    //SAVE PRODUCTOS DEL USUARIO
    save_producto: async(req, res) => {

        try{
            //Recibimos new producto del frontend
            const {producto, precio, descripcion, categoria, phone, email} = req.body;

            //Validamos campos requeridos
            if((precio <0 || precio === null) || !producto.trim() || !phone.trim()) return res.json({err: true, message: 'DATO INCORRECTO'});
            
            //Creamos modelo mongoose
            const product = new Producto({
                producto, precio, categoria, descripcion, phone, email
            })  

            //Cloudinary => almacenamiento de imagenes, validacion datos se hace frontend
            for(let i=0; i<req.files.length; i++){

                req.files[i].size = 50;

                const data = await cloudinary.v2.uploader.upload(req.files[i].path, {folder: `usadoGamer/${req.user._id}`}); 
                product.ImageURL.push(data.url);

                fs.unlink(req.files[i].path);
            }

            product.user = req.user._id;

            //Guardamos modelo en base de datos
            await product.save();
            
            return res.json({err: null, data: product});
   
        }catch{err=>console.error(err)}

    },


    //OBTENER PRODUCTOS DEL USUARIO
    get_productos: async(req, res) => {

        try{

            let limit = parseInt(req.query.limit) || 10;
            let page = parseInt(req.query.page) || 1;

            const productos = await Producto.paginate({user: req.user._id}, {limit, page})
    
            return res.json({err: null, productos})
      
        }catch{err => console.error(err)}

    },


    //UPDATE PRODUCTOS DEL USUARIO
    update_producto: async(req, res) => {

        try{

            const productoId = req.params.id;
            const update = req.body;

            console.log(update.precio)
            if((update.precio<0 || !update.precio)|| !update.producto.trim() || !update.phone.trim()){
                return res.json({err: true, data: 'DATO INCORRECTO'});
            }

            await Producto.findByIdAndUpdate(productoId, update, {new: true}, (err, productoUpdate) => {
                if(err) return res.status(500).json({message: 'ERROR INESPERADO OCURRIO INTENTELO NUEVAMENTE'});
                if(!productoUpdate) return res.json({err: 'no se ha podido actualizarse'});

                return res.json({err: null, productoUpdate, update})
            })

        }catch{err => console.error(err)} 
    },


    //DELETE PRODUCTOS DEL USUARIO
    delete_producto: async(req, res) => {
        try{

            const productoId = req.params.id;

            await Producto.findByIdAndDelete(productoId, (err, deletedProducto) => {
                if(err) return res.status(500).json({message: 'ERROR INESPERADO OCURRIO INTENTELO NUEVAMENTE', err: true});
                if(!deletedProducto) return res.status(404).json({err: true, message: 'Producto no encontrado pata eliminar'});

                return res.json({err: null, deletedProducto});
            })

        }catch{err => console.error(err)}
    }
}



module.exports = controller

