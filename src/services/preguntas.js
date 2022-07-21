const Categorias = [
    {
        imageURL: 'https://res.cloudinary.com/dyntggmrp/image/upload/v1614702155/Capa_2_akgamx.png',
        title: 'Uso de la aplicación',
        name: 'app'   
    },
    {
        imageURL: 'https://res.cloudinary.com/dyntggmrp/image/upload/v1614702155/Capa_1_hnqcjn.png',
        title: 'Seguridad de la app',
        name: 'seguridad'
    }
]
    
const preguntas = [ 
    {
        type: 'app',
        title: '¿Quienes Somos?',
        res: 'Somos una aplicación creada para publicar y vender componentes de la computadora que ya no usas de una manera totalmente gratuita.'
    },
    {
        type: 'app',
        title: '¿Como puedo publicar?',
        res: 'Para publicar en usadogaming debes crearte una cuenta totalmente gratis donde podrás empezar a vender hardware de una manera inmediata.'
    },
    {
        type: 'app',
        title: '¿Publicar es gratis?',
        res: 'Publicar en nuestra aplicación es totalmente gratis y seguro. Solo tú podrás ver tus publicaciones y editarlas o eliminarlas.'
    },
    {
        type: 'app',
        title: '¿Como me contacto ante una duda?',
        res: 'Puedes contactarnos de una manera mas directa a nuestro email usadogaming@gmail.com o de otro modo enviando un mensaje en la aplicacion.'
    },
    {
        type: 'seguridad',
        title: '¿La apliación es de uso seguro?',
        res: 'La aplicación es totalmente segura y libre de cualquier amenaza.'
    },
    {
        type: 'seguridad',
        title: '¿Por qué debo registrarme para publicar?',
        res: 'Necesitamos tu registro para almacenar tus publicaciones y hacer de la aplicación una plataforma más segura.'
    }
]

export default {preguntas, Categorias}