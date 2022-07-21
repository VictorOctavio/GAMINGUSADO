import React from 'react'

//COMPONENTS
import NewProducto from './newProducto'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {newProductoAction, updateProductoAction} from '../../redux/adminDucks'
const ProductoContainer = () => {

    const dispatch = useDispatch()
    const loading = useSelector(store => store.admin.loading)
    const message_error = useSelector(store => store.admin.message)

    const [edit, setEdit] = React.useState(false)
    const [err, setErr] = React.useState(false)

    const [newProducto, setNewProducto] = React.useState({
        producto: '',
        precio: 0,
        descripcion: '',
        categoria: 'pc',
        email: '',
        phone: ''
    })

    const [images, setImage] = React.useState(null)

    const handleGetData = e => {
        setNewProducto({
            ...newProducto,
            [e.target.name]: e.target.value
        })
    }

    const handleGetImage = e => {
        setImage(e.target.files);
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        setErr(false); 

        if(!edit){
            dispatch(newProductoAction(newProducto, images, setNewProducto));
        }else dispatch(updateProductoAction(newProducto, setNewProducto, setErr));
        
        if(!message_error.state) setNewProducto({
            producto: '',
            precio: 0,
            descripcion: '',
            categoria: 'pc',
            email: '',
            phone: ''
        })

    }

    const handleEdit = (producto) => {
        setEdit(true)
        
        window.scroll(0, 10);

        setNewProducto({
            id: producto._id,
            producto: producto.producto,
            precio: producto.precio,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            email: producto.email,
            phone: producto.phone
        })
    }

    return (
        <React.Fragment>
            <NewProducto
                newProducto={newProducto}
                handleGetData={handleGetData}
                handleSubmit={handleSubmit}
                edit={edit}
                handleEdit={handleEdit}
                handleGetImage={handleGetImage}
                loading={loading}
                message_error={message_error}
            />
        </React.Fragment>
    )
}

export default ProductoContainer
