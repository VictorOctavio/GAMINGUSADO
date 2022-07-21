import config from '../config';
import axios from 'axios';

const dataInicial = {
    productos: [],
    producto: null,
    loading: false,
    favoritos: [],
    message: {state: false}
}

const LOADING = 'LOAGING'
const PRODUCTOS_EXITO = 'PRODUCTOS_EXITO'
const PRODUCTO_EXITO = 'PRODUCTO_EXITO'
const FAV_EXITO = 'FAV_EXITO'
const MESSAGE = 'MESSAGE'
const ERROR = 'ERROR'

//Reducer
export default function appReducer(state = dataInicial, action){
    switch(action.type){
        case LOADING: return {...state, loading: true}
        case MESSAGE: return {...state, message: action.payload}
        case PRODUCTOS_EXITO: return {...state, loading: false, productos: action.payload}
        case PRODUCTO_EXITO: return {...state, loading: false, producto: action.payload}
        case FAV_EXITO: return {...state, loading: false, favoritos: action.payload}
        case ERROR: return {...state, message: action.payload}
        default: return{...state}
    }
}

//Action
//PRODUCTOS ACCION
export const getProductosAction = (limit, page) => async(dispatch) => {
    const URI = config.URI;
    try{

        dispatch({type: LOADING})

        if(limit){
            const res = await axios.get(`${URI}/app/productos?limit=${limit}&page=${page}`)
            const data = res.data;

            dispatch({type: PRODUCTOS_EXITO, payload: data.productos})
            return
        }
        
        const res = await axios.get(`${URI}/app/productos`)
        const data = res.data;

        if(data.err) return console.log(data.err)

        dispatch({
            type: PRODUCTOS_EXITO,
            payload: data.productos
        })

    }catch(err){
        console.log(err)
    }
} 


//BUSCAR PRODUCTO ID URL
export const getProductoAction = () => async(dispatch) => {

    const URI = config.URI;

    try{
        dispatch({type: LOADING})

        const url = window.location.pathname;
        const splitURL = url.split(`/`);
        const productoId = splitURL[2];

        const res = await axios(`${URI}/app/producto/${productoId}`)
        const data = res.data;
        
        if(data.err){
            const message_error = {state: true, message: data.message, title: 'UPS! :C'}
            dispatch({type: ERROR, payload: message_error});
            setTimeout(() => { dispatch({type: ERROR, payload: {state: false}}) }, 4000);
            return
        } 

        dispatch({type: PRODUCTO_EXITO, payload: data.producto})
    

    }catch(err){console.log(err)}
} 

//CATEGORIAS ACCION y buscador
export const getCategoriaProductos = (sort, page) => async(dispatch) => {

    const URI = config.URI;
    const categoria = window.location.pathname.split('/')[2] || 'all';
    let url = null;
    let filter = sort || '-createdAt';

    // Categorias
    const categorias = ["pc", "procesador", "grafica", "ram", "almacenamiento", "monitor", "mouse", "auricular", "teclado", "kit", "microfono", "all"]
    
    //Categoria solicitada Cliente se encentra en array CATEGORIAS
    if(categorias.includes(categoria)){
         url = `${URI}/app/productos?categoria=${categoria}&limit=${21}&page=${page}&sort=${filter}`
    }else{
        url = `${URI}/app/search?search=${categoria}&limit=${21}&page=${page}&sort=${filter}`
    };

    try{

        const res = await fetch(url)
        const data = await res.json()
        
        if(data.err) return console.error(data.err)

        dispatch({type: PRODUCTOS_EXITO,payload: data.productos})


    }catch(err){console.error(err)}
}


//FILTRADO ACCION
export const getFiltrosPrcio = (filtroPrecio) => async(dispatch) => {

    const URI = config.URI;
    const categoria = window.location.pathname.split('/')[2] || 'all';
    
    try{

        const config = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(filtroPrecio)
        }
        const res = await fetch(`${URI}/app/filter-precio?categoria=${categoria.toLocaleLowerCase()}`, config)
        const data= await res.json()

        if(data.err){
            const message_error = {state: true, message: data.message, title: 'ERROR!'}
            dispatch({type: ERROR, payload: message_error});
            setTimeout(() => { dispatch({type: ERROR, payload: {state: false}}) }, 3000);
            return
        } 
  
        const DataFilter = {docs: data.data, hasNextPage: null, hasPrevPage: null}   

        dispatch({type: PRODUCTOS_EXITO, payload: DataFilter})

    }catch(error){console.error(error)}
}


//RELACIONADOS ACCIÓN
export const getRelacionados = (categoria) => async(dispatch) => {

    const URI = config.URI;

    try{
        const res = await fetch(`${URI}/app/productos?categoria=${categoria}&limit${12}`)
        const data = await res.json()
        
        if(data.err) return console.log(data.err)
        
        dispatch({
            type: PRODUCTOS_EXITO,
            payload: data.productos
        })

    }catch(error){console.log(error)}
}


//SUBSCRIPTOR
export const subAction = (sub, setSubConfirm) => async(dispatch) => {
    const URI = config.URI;
    const new_sub = {sub}
    try{
        
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_sub)
        }

        const res = await fetch(`${URI}/app/new-sub`, config);
        const data = await res.json();

        if(data.err) return setSubConfirm({sub: true, message: data.message});
        if(!data.err) setSubConfirm({sub: true, message: 'BIENVENIDO, GRACIAS POR SUBSCRIBIRTE!'});

    }catch(error){console.error(error)}
}



//FAVORITO ACTION
export const favoritoAction = (productoId, producto) => async(dispatch, getState) => {
    try{
        const URI = config.URI;
        const {token} = getState().user
        const id = {productoId}
        let message2 = {state: false}

        if(!token || token === null){
           let messageERROR = {state: true, title: 'UPS LO SENTIMOS', message: 'DEBES INICIAR UNA SESIÓN'}
           dispatch({type: MESSAGE, payload: messageERROR}) 
           setTimeout(() => { dispatch({type: MESSAGE, payload: message2})}, 3000);
           return
        }

        const conf = {
            method: 'PUT',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
         
        const res = await fetch(`${URI}/saved-product`, conf)
        const data = await res.json()

        let message = {state: true, title: 'Guadado Correctamente' , message:`Tú ${producto} te está esperando`}

        if(data.err) {
            let messageERROR = {state: true, title: 'UPS', message: data.message}
            dispatch({type: MESSAGE, payload: messageERROR}) 
            setTimeout(() => { dispatch({type: MESSAGE, payload: message2})}, 3000);
            return
        }

        dispatch({type: MESSAGE, payload: message})

        setTimeout(() => { dispatch({type: MESSAGE, payload: message2})}, 3000);

    }catch(error){console.error(error)}
}

//GET FAVORITOS USER
export const getfavoritoaction = () => async(dispatch, getState) => {
    try{

        dispatch({type: LOADING})

        const URI = config.URI;
        const {token} = getState().user

        const conf = {
            method: 'GET',
            headers: {'auth-token': token,}
        }
         
        const res = await fetch(`${URI}/saved-products`, conf)
        const data = await res.json()

        if(data.err) return console.log(data.message)
        
        dispatch({ type: FAV_EXITO, payload: data})
    
    }catch(error){console.error(error)}
}


//DELETE FAVOTIRO ACTION 
export const deleteFavoritoAction = (id) => async(dispatch, getState) => {
    try{

        const URI = config.URI;
        const {token} = getState().user
        const {favoritos} = getState().app 
        console.log(favoritos);

        const conf = {
            method: 'PUT',
            headers: {
                'auth-token': token
            }
        }
         
        const res = await fetch(`${URI}/delete-saved-product/${id}`, conf);
        const data = await res.json();

        if(data.err) return console.log('OCURRIO UN ERROR')

        const arrayFilter = favoritos.data.filter(item => item._id!=id);
        data.data = arrayFilter;

        dispatch({ type: FAV_EXITO, payload: data})

    }catch(err){console.log(err)}
}



//MESSAGE CONTACTO
export const contactoAction = (message) => async(dispatch) => {
    
    const URI = config.URI;
   
    try{

        const conf = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(message)
        }

        const res = await fetch(`${URI}/app/contacto`, conf)
        const data = await res.json();

        if(data.err){
            const message_error = {state: true, message: data.message, title: 'ERROR!'}
            dispatch({type: ERROR, payload: message_error});
        }else{    
            const message_error = {state: true, message: data.message, title: 'Mensaje Enviado'}
            dispatch({type: ERROR, payload: message_error})
        } 
  
        setTimeout(() => { dispatch({type: ERROR, payload: {state: false}}) }, 3000);


    }catch(error){console.error(error)}
}