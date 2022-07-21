const jwt = require('jsonwebtoken')
const Role = require('../models/role');
const User = require('../models/user');

const verifyController = {
    
    verifyToken: async(req, res, next) => {
    
        //Verificamos Token
        const token = req.header('auth-token');
        if(!token) return res.status(401).json({err: true, message: 'Token no existe'})
    
        //Veficamos validación token
        try{

            const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verifyToken;
            next();
    
        }catch(error){return res.json({err: true, message: error})}
    },

    verifyAdmin: async(req, res, next) => {
        try{

            //Obtenemos USUARIO Y SUS ROLES
            const user = await User.findById(req.user._id);
            const roles = await Role.find({_id: {$in: user.roles}});

            //Verificamos el rol de administrador
            for(let i=0; i < roles.length; i++){
                if(roles[i].name === "admin") return next()
            }

            return res.json({err: true, message: 'No tienes permiso administrador'})
            
        }catch(error){return res.json({err: true, message: error})}
    }
    
}

module.exports = verifyController
