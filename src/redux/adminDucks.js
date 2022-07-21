import config from '../config';
import axios from 'axios';

const dataInicial = {
    loading: false,
    mis_productos: null,
    message: { state: false, message: '' }
}

const LOADING = 'LOAGING'
const MISPRODUCTOS_EXITO = 'MISPRODUCTOS_EXITO'
const MESSAGE = 'MESSAGE'

//Reducer
export default function adminReducer(state = dataInicial, action) {
    switch (action.type) {

        case LOADING: return { ...state, loading: true }

        case MISPRODUCTOS_EXITO: return { ...state, loading: false, mis_productos: action.payload }

        case MESSAGE: return { ...state, loading: false, message: action.payload }

        default: return { ...state }
    }
}

//Acciones
//AGREGAR NUEVO PRODUCTO
export const newProductoAction = (producto, images) => async (dispatch, getState) => {

    const URI = config.URI;
    const { token } = getState().user
    const { mis_productos } = getState().admin

    try {

        dispatch({ type: LOADING });

        //Validamos existencia y limite de imagenes
        if (images === null || images.length === 0) {
            dispatch({ type: MESSAGE, payload: { state: true, message: 'Las imagenes son requeridas' } });
            return setTimeout(() => { dispatch({ type: MESSAGE, payload: { state: false } }) }, 3000)

        } else if (images.length > 6) {
            dispatch({ type: MESSAGE, payload: { state: true, message: 'Maximo 6 files permitido' } });
            return setTimeout(() => { dispatch({ type: MESSAGE, payload: { state: false } }) }, 3000)
        }


        //Creamos Objeto Para enviar FETCH
        const formdata = new FormData();
        for (const productValue in producto) { formdata.append(productValue, producto[productValue]) }
        for (let i = 0; i < images.length; i++) { formdata.append("images", images[i]); }

        //Configuramos Petición
        const config = {
            method: 'POST',
            headers: { 'auth-token': token },
            body: formdata,
            redirect: 'follow'
        };

        //Realizamos Petición Fetch
        const res = await fetch(`${URI}/save-producto`, config)
        const data = await res.json()

        //Capturamos posibles errores
        if (data.err) {
            dispatch({ type: MESSAGE, payload: { state: true, message: data.message } });
            return setTimeout(() => { dispatch({ type: MESSAGE, payload: { state: false } }) }, 3000)
        }

        //Actualizamos y enviamos listado vista productos agregando el añadido
        mis_productos.docs.push(data.data);
        dispatch({ type: MISPRODUCTOS_EXITO, payload: mis_productos })

    } catch (err) { console.log(err) }
}



//LISTAR PRODUCTOS DEL USUARIO
export const getProductosAction = () => async (dispatch, getState) => {

    const URI = config.URI;
    const { token } = getState().user

    try {

        const res = await axios({
            method: 'GET',
            url: `${URI}/productos?limit=1000`,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })

        const data = res.data;

        if (data.err) return console.error(data.err)

        dispatch({
            type: MISPRODUCTOS_EXITO,
            payload: data.productos
        })

    } catch (err) { console.log(err) }
}



//UPDATE PRODUCTO DEL USARIO 
export const updateProductoAction = (producto, setEdit, setErr) => async (dispatch, getState) => {

    const { token } = getState().user
    const URI = config.URI;
    const { mis_productos } = getState().admin
    try {

        const config = {
            method: 'PUT',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        }

        const res = await fetch(`${URI}/update-producto/${producto.id}`, config)
        const data = await res.json();

        if (data.err) return setErr(true);

        dispatch({ type: LOADING })

        const arrayFilter = mis_productos.docs.map(item => (
            item._id === producto.id ? producto : item
        ))

        mis_productos.docs = arrayFilter;

        setEdit({ producto: '', precio: 0, descripcion: '', categoria: 'pc', email: '', phone: '' })

        dispatch({
            type: MISPRODUCTOS_EXITO,
            payload: mis_productos
        })

    } catch (error) { console.error(error) }
}



//ELIMINAR PRODUCTO DEL USUARIO
export const deleteProductoAction = (id) => async (dispatch, getState) => {
    const { token } = getState().user
    const { mis_productos } = getState().admin

    const URI = config.URI;

    try {

        const config = {
            method: 'DELETE',
            headers: { 'auth-token': token }
        }

        const res = await fetch(`${URI}/delete-producto/${id}`, config)
        const data = await res.json()

        if (data.err) return console.log(data.err)

        const arrayFiler = mis_productos.filter(item => item._id !== id)

        dispatch({
            type: MISPRODUCTOS_EXITO,
            payload: arrayFiler
        })

    } catch (error) { console.error(error) }
}