const nodemailer = require('nodemailer');
const mailsType = require('./mails');

const sendEmail = async(user, token, destino) => {
    let mesaggeHTML;

    if(destino === 'sub') mesaggeHTML = mailsType.sub;
    else if(destino === 'confirm') mesaggeHTML = mailsType.confirmMail(token);  
    else if(destino === 'admin') mesaggeHTML = token;
    else if(destino === 'recuperarClave') mesaggeHTML = mailsType.recuperarClave(token);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user:process.env.USER, 
          pass: process.env.PASS
        }
    })

    await transporter.sendMail({
        from: '"Bienvenido a UsadoGamer" <usedGaming@gmail.com>',
        to: user, 
        subject: "Empieza ahora mismo a ver nuevas publicaciones", 
        html: mesaggeHTML
    })
      
};

module.exports = sendEmail;