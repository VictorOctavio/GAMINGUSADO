const mailsDestinos = {
    sub: `
    <div style="background: linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2)">
        <div class="container" style=" width: 100%;margin: auto;font-family: Arial; text-align: center; padding: 100px 0;">
        <div class="card" style="padding: 50px 10px; background-color: rgba(0, 0, 0, 0.295);width: 50%;margin: 0 auto;border: 1px solid rgba(7, 7, 7, 0.774);">
            <h1 style="font-weight: 800;color: #fff;width: 100%;margin: 0 auto;">
            ERES NUEVO SUBSCRIPTOR <br />
            MERCADO GAMER
            </h1>
            <a href="http://localhost:3000/" target="_blank" title="ir a la página">
            <img
                style="  top: 0;margin: 0;padding: 20px;"
                src="https://res.cloudinary.com/dyntggmrp/image/upload/v1631216888/usadoGamer/login_qvusbo.png"
                alt="img-gaming"
                width="200px"
            />
            </a>
            <h4 style="font-size: 20px;">Recibiras toda informacion necesaria de la app!</h4>
        </div>
        </div>
    </div>
    `,

    confirmMail: (token) => {
        return `
        <div style="font-family: Arial; padding: 100px 50px; background: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%); width: 40%; margin: 0 auto;">
            <div style="background: rgb(255, 255, 255, 0.3); padding: 10px 0; width: 100%;">
                <h1 style="color: #fff; font-weight: 800; margin-bottom: 10px; text-align: center;">VALICACIÓN DE CUENTA</h1>
                <h6 style="color: rgb(0, 0, 0); font-weight: 400; font-size: 18px; text-align: center">
                    Tu email ha sido registrado en <a href="http://localhost:3000/" target="_blanck" style="color: #fff; text-align: center">usedgaming.com</a>
                </h6>
                
                <a href="http://localhost:3000/validar-email/${token}" target="_blanck"  style="margin-top: 50px; width: 100%;">
                    <img src="https://res.cloudinary.com/dyntggmrp/image/upload/v1631216888/usadoGamer/login_qvusbo.png" alt="img-gaming" width="300px" style="display: block; margin: 0 auto;"/>
                </a>

                <h6 style="font-size: 16px; text-align: center">
                    haz click en la imagen o <a href="http://localhost:3000/validar-email/${token}" target="_blanck" style="color: rgb(85, 123, 172);">aqui</a> para validarlo
                </h6>
                <p style="text-align: center">En caso que no seas tú, puedes ignorarlo</p>
                <img src="https://res.cloudinary.com/dyntggmrp/image/upload/v1623778080/logo_isbszw.png" style="display: block; margin: 0 auto;"  width="50px"/>
            </div>
        </div>
        `
    },

    recuperarClave: (token) => {
        return `
        <div style="font-family: Arial; padding: 100px 50px; background: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%); width: 100%; margin: 0 auto;">
            <div style="background: rgb(255, 255, 255, 0.3); padding: 10px 0; width: 100%;">
                <h1 style="color: #fff; font-weight: 800; margin-bottom: 10px; text-align: center;">RECUPERACION DE CUENTA</h1>
                
                <a href="http://localhost:3000/recuperar-clave/${token}" target="_blanck"  style="margin-top: 50px; width: 100%;">
                    <img src="https://res.cloudinary.com/dyntggmrp/image/upload/v1631216888/usadoGamer/login_qvusbo.png" alt="img-gaming" width="300px" style="display: block; margin: 0 auto;"/>
                </a>

                <h6 style="font-size: 16px; text-align: center">
                    haz click en la imagen o <a href="http://localhost:3000/recuperar-clave/${token}" target="_blanck" style="color: rgb(85, 123, 172);">aqui</a> para restaurar clave
                </h6>
                <p style="text-align: center">En caso que no seas tú, puedes ignorarlo, tu cuenta esta segura</p>
                <img src="https://res.cloudinary.com/dyntggmrp/image/upload/v1623778080/logo_isbszw.png" style="display: block; margin: 0 auto;"  width="50px"/>
            </div>
        </div>
        `
    }
}

module.exports = mailsDestinos;