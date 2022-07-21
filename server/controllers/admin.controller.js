const User = require('../models/user');
const Messages = require('../models/message');
const Sub = require('../models/sub');
const sendMail = require('../libs/nodemailer');

//Create Controller
const controller = {
    
    verifyAdmin_user: (req, res) => {
        return res.json({err: false, admin: true});
    },

    users: async(req, res) => {
     
        let limit = parseInt(req.query.limit) || 3;
        let page = parseInt(req.query.page) || 1;
        let sort = req.query.sort || 'createdAt'

        const users = await User.paginate({}, {limit, page, sort})
        return res.json({err: false, message: 'ESTAS EN MODO ADMINISTRADOR', data: users})
    },

    messages: async(req, res) => {

        let limit = parseInt(req.query.limit) || 3;
        let page = parseInt(req.query.page) || 1;
        let sort = req.query.sort || '-fecha'

        const users = await Messages.paginate({}, {limit, page, sort});
        return res.json({err: false, message: 'ESTAS EN MODO ADMINISTRADOR', data: users})
    },


    bloqued_user: async(req, res) => {
        try{

            const user = await User.findOneAndUpdate({_id: req.params.id}, {bloqued: true});

            return res.json({err: false, message: user});

        }catch(error){return res.json({err: true, message: error})}
    },

    desboqued_user: async(req, res) => {
        try{

            await User.findOneAndUpdate({_id: req.params.id}, {bloqued: false});

            return res.json({err: false, message: 'USUARIO BLOQUEADO'})

        }catch(error){return res.json({err: true, message: error})}
    },

    sendmail: async(req, res) =>{
        try{
            const {title, message, destino} = req.body;

            if(destino === 'todos'){
                const users = await User.find({confirmUser: true});
                users.map(item => {
                    sendMail(item.email, message, 'admin');
                })
            }else{

                const users = await Sub.find();
                users.map(item => {
                    sendMail(item.email, message, 'admin');
                })
            }

            return console.log(title, message, destino);
        }catch(error){return res.json({err: true, message: error})}
    }

}

//Export Controller
module.exports = controller