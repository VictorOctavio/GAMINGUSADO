'use strict'
const Producto = require('../models/producto');
const Sub = require('../models/sub');
const Message = require('../models/message');
const sendEmail = require('../libs/nodemailer');


const controller = {

    get_app_producto: async(req, res) => {

        try{

            const productoId = req.params.id;
            const producto = await Producto.findById(productoId);
            if(!producto) return res.json({err: true, message: 'no se encontro producto'});
            
            return res.send({success: 'producto encontrado con exito', producto});

        }catch{err => console.error(err)}

    },


    get_app_productos: async(req, res) => {

        try{

            let limit = parseInt(req.query.limit) || 30;
            let page = parseInt(req.query.page) || 1;
            let categoria = req.query.categoria || null;
            let sort = req.query.sort || '-createdAt';

            if(categoria === null || categoria === 'all'){
                const productos = await Producto.paginate({}, {limit, page, sort})
                return res.json({err: null, productos})
            }else{
                const productos = await Producto.paginate({categoria: {$in:categoria}}, {limit, page, sort})
                return res.json({err: null, productos})
            }

        }catch{err => console.error(err)}

    },


    search_productos: async(req, res) => {
        try{
            let limit = parseInt(req.query.limit) || 21;
            let page = parseInt(req.query.page) || 1;
            let search = req.query.search || 'all';
            let sort = req.query.sort || '-createdAt';
            
            let productos;
            if(search){

                //BUSCAMOS POR NOMBRE PUBLICACION
                productos = await Producto.paginate({
                    producto: {$regex: '.*'+search+'.*', $options: "i"}
                }, {limit, page, sort})

                //Si no se encuntra buscar por descipción
                if(productos.docs.length <= 0){
                    productos = await Producto.paginate({
                        descripcion: {$regex: '.*'+search+'.*', $options: "i"}
                    }, {limit, page, sort})
                }
                
                return res.json({err: null, productos})
            }

            return res.json({err: true, message: `no se encontro productos de ${search}`})

        }catch(error){res.json({err: true, message: error})}
    },



    //FILTER PRECIOS 
    filter_precio: async(req, res) => {
        try{
            
            let min = parseInt(req.body.min) || 0;
            let max = parseInt(req.body.max) || 999999;
            let categoria = req.query.categoria || null;

            let productos = [];

            //VALIDACIONES
            if(min >= max) return res.json({err: true, message: 'Error al realizar Busqueda'})

            if(categoria === null || categoria === 'all'){
                productos = await Producto.find({precio: {$gte: min, $lte: max}});
            }else{
                productos = await Producto.find({categoria: {$in:categoria}, precio: {$gte: min, $lte: max}});
            }
            
            if(productos.length <= 0) return res.json({err: true, message: 'No se encontraron resultados'});

            return res.json({err: false, data: productos})

        }catch(error){return res.json({err: true, message: error})}
    },


    //NUEVO SUBSCRIPTOR
    new_sub: async(req, res) => {
        const {sub} = req.body;
        try{
            const validateEmail = await Sub.findOne({email: sub});
            if(validateEmail) return res.json({err: true, message: 'El email ya esta subscripto'})

            const new_sub = new Sub({email: sub})
            const sub_creado = await new_sub.save()
            
            const token = 'asdasd';
            sendEmail(sub, token, 'sub');
            
            return res.json({err: false, message: sub_creado})

        }catch(error){return res.json({err: true, message: error})}     
    },



    //CONTACTO MESSAGE
    contacto: async(req, res) => {
        try{

            const {email, name, message} = req.body;
            
            const new_message = new Message({email, name, message, fecha: Date.now()});
            
            const message_user = await new_message.save();
            if(!message_user) return res.json({err: true, message: 'No se puedo enviar, vuelve a intentarlo'});

            return res.json({err: false, message: 'Se envió correctamente'});

        }catch(error){return res.json({err: true, message: error})}
    }

}

module.exports = controller

