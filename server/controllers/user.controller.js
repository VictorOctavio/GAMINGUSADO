'use strict'
const User = require('../models/user');
const Producto = require('../models/producto');
const Role = require('../models/role');
const jwt = require('jsonwebtoken');
const sendMail = require('../libs/nodemailer');

//Vidaciones HapyJoi
const joi = require('@hapi/joi');
const schemaRegister = joi.object({
    username: joi.string().min(4).max(255).required(),
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(8).max(1024).required(),
    roles: joi.array()
})
const schemaLogin = joi.object({
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(8).max(1024).required()
})
const schemaRecuperar = joi.object({
    password: joi.string().min(8).max(1024).required(),
})

const controller = {

    //REGISTRO USUARIO
    user_register: async(req, res) => {

        //Validamos data del Body
        const {error} = schemaRegister.validate(req.body);
        if(error) return res.json({err: true, message: error.details[0].message})

        try{
            //Obtenemos datos desde el body
            const {username, password, email, roles} = req.body;

            //Validamos Email
            const validateEmail = await User.findOne({email: email})
            if(validateEmail) return res.json({err:true, message: 'Email ya registrado'})
    
            //Ecryptamos Contraseña
            const newUser = new User({username, password: await User.encryptPassword(password), email})
            
            //Asignamos y validamos Roles
            if(roles){
                const foundRoles = await Role.find({name: {$in: roles}});
                if(foundRoles.length <= 0) return res.json({err: true, message: 'Error al asiganar role. "ROLE NO EXISTENTE'});
                newUser.roles = foundRoles.map(role => role._id);
            }else{
                const role = await Role.findOne({name: "user"})
                newUser.roles = [role._id]
            }

            //false Confirmacion
            newUser.confirmUser = false;

            //Guardamos en base de datos
            const user = await newUser.save()
            if(!user) return res.json({err: true, message: 'No se ha podido realizar registro, vuelva a intentarlo!'})
            
            //Creamos token Usuario
            const token = jwt.sign({
                username: user.username,
                email: user.email,
                roles: user.roles,
                _id: user._id
            }, process.env.TOKEN_SECRET);


            await sendMail(user.email, token, 'confirm');
            
            return res.json({err: false, message: 'Registro exitoso! se envió correo de verificación'});
            
        }catch{err => console.log(err)}
    
    },
    

    user_confirm: async(req, res) =>{
        try{
            const updateConfirm = await User.findOneAndUpdate({_id: req.user._id}, {confirmUser: true});

            if(!updateConfirm) return res.json({err: true, message: 'Ocurrio un error en la validacion'});
            
            return res.json({err: false, message: 'CUENTA CONFIRMADA'});
        }catch(err){return res.json({err: true, message: err})}
    },

    //LOGIN DEL USUARIO
    user_login: async(req, res) => {

        //Validamos data del Body
        const {error} = schemaLogin.validate(req.body);
        if(error) return res.json({err: true, message: error.details[0].message})

        try{
            const {email, password} = req.body;

             //Validate Email Existente
             const validateEmail = await User.findOne({email});
             if(!validateEmail) return res.json({err: true, message: 'Email no registrado'})
            
            //Validate Email Bloqueado
             if(validateEmail.bloqued) return res.json({err: true, message: 'Tu cuentas ha sido bloqueada'});

             //Validate Password
             const validatePassword =  await User.comparePassword(password, validateEmail.password);
             if(!validatePassword) return res.json({err: true, message: 'Contraseña incorrecta'});

             //Validate Confirmacion Usuario Email
            if(!validateEmail.confirmUser){
                return res.json({err: true, message: 'Email no verificado :c'});
            }

             //TOKEN
             const token = jwt.sign({
                username: validateEmail.username,
                email: validateEmail.email,
                _id: validateEmail._id,
                categoria_vista: validateEmail.categoria_vista,
                roles: validateEmail.roles
             }, process.env.TOKEN_SECRET)
            
             return res.header('auth-token', token).json({
                err: null, data: {token}
             })

        }catch(error){return res.json({err: error})}

    },


    user_getSaveProducts: async(req, res) => {
        try{
            
            const user = await User.findOne({_id: req.user._id});
            if(!user) return res.json({err: true, message: 'Usuario no encontrado!'});

            const productos = await Producto.find({_id: user.saved});

            return res.json({err: null, data: productos});

        }catch(err){return res.json({err: true, message: 'ALGO SALIO MAL, GET PRODUCTS FAVORITES'})}
    },

    user_saveProduct: async(req, res) => {
        try{
            
            //Id de producto a guardar
            const {productoId} = req.body;
            
            //Buscar producto en data base
            const producto = await Producto.findOne({_id: productoId});
            if(!producto) return res.json({err: true, message: 'Producto no exite, error en ID'});

            //Buscamos usuario
            const user = await User.findOne({_id: req.user._id});
            if(!user) return res.json({err: true, message: 'Usuario no existente'});
            
            //Producto ya agregado
            if(user.saved.includes(productoId)) return res.json({err: true, message: 'elemento existente'});

            //PUSH ID
            user.saved = user.saved.push(productoId);
            
            //Update Favorito de Usuarios
            const userUpdate = await User.findOneAndUpdate({_id: user._id}, {saved: user.saved}, {new: true});
            if(!userUpdate) return res.json({err: true, message: 'Erro al intentar acutalizar'});

            //Devolvemos array
            return res.json({err: null, data: userUpdate.saved});

        }catch(err){return res.json({err: true, message: 'ALGO SALIÓ MAL'})}
    },

    user_deleteSaveProducto: async(req, res) => {
        try{

             //Id de producto a eliminar
             const productoId = req.params.id;

            //Buscamos usuario
            const user = await User.findOne({_id: req.user._id});
            if(!user) return res.json({err: true, message: 'Usuario no existente'});

            //Producto ya agregado
            if(!user.saved.includes(productoId)) return res.json({err: true, message: 'elemento no existente'});

            //Eliminamos
            user.saved = user.saved.filter(elem => elem != productoId);
            
            //Update
            const update = await User.findOneAndUpdate({_id: user._id}, {saved: user.saved});
            if(!update) return res.json({err: true, message: 'Erro al intentar acutalizar'});

            //Devolvemos array filtrado
            return res.json({err: null, data: user.saved})

        }catch(err){return res.json({err: true, message: 'ALGO SALIÓ MAL'})}
    },


    //RECUPERACION DE CONTRASEÑA DEL USUARIO
    user_recuperacionClave: async(req, res) => {
        try{

            //Obtenemos Data del Usuario EMAIL  
            const {email} = req.body; 
            
            const user = await User.findOne({email});
            if(!user) return res.json({err: true, message: 'Email no registrado'});

            //Creamos token
            const token = jwt.sign({
                _id: user._id
            }, process.env.TOKEN_SECRET);

            //Enviamos correo verificamos de email
            await sendMail(user.email, token, 'recuperarClave');

            return res.json({err: null, message: 'Se envió correo de recuperación'});

        }catch(err){return res.json({err: true, message: 'OCURRIÓ ERROR INESPERADO'})}
    },

    user_newContraseña: async(req, res) => {
        try{
            //Capturamos new password user
            const {password} = req.body;
            const {error} = schemaRecuperar.validate(req.body);
            if(error) return res.json({err: true, message: error.details[0].message});

            //Buscamos usuario token id
            const user = await User.findOne({_id: req.user._id})
            if(!user) return res.json({err: true, message: 'usuario no valido'});
            
            //Encrypt password
            const passwordEncrypt = await User.encryptPassword(password);

            //Update user password
            const update = await User.findOneAndUpdate({_id: user._id}, {password: passwordEncrypt});
            if(!update) return res.json({err: true, message: 'no se ha podido actualizar contraseña.'});

            //Devolvemos menssage de exito!
            return res.json({err: null, message: 'contraseña actualizada'});

        }catch(err){return res.json({err: true, message: 'OCURRIÓ ERROR INESPERADO'})}
    }
}

module.exports = controller



