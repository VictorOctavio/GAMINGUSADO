import React from 'react'

//REDUX
import {useDispatch, useSelector} from 'react-redux';
import {getProductosAction, deleteProductoAction} from '../../redux/adminDucks';

//ReactIcons
import {AiFillDelete, AiFillEye} from 'react-icons/ai'

//BOOTSTRAP REACT
import {ListGroup} from 'react-bootstrap'

const img = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1615377457/gamer_la1c3v.png'

const ListProductos = ({handleEdit}) => {

    //Dispatch Initialization
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getProductosAction())
    }, [dispatch])

    const misProductos = useSelector(store => store.admin.mis_productos);

    // hasPrevPage
    const handleDeleteProducto = id => {
        if(window.confirm('¿seguro deseas eliminar?')){
            dispatch(deleteProductoAction(id))
            window.location.reload()
        }
    }

    return (
        <div className="container" style={{marginTop: '100px', minHeight: '560px'}}>
            <div className="row">

            <div className="col-12 pb-2 text-center"><h2 style={{borderBottom: '1px solid #e4e4e4', paddingBottom: '3px'}}>Mis Productos</h2></div>
                {misProductos !== null && misProductos.docs.length > 0 ? (
                    misProductos.docs.map(item => (
                        <ListGroup className="col-12" key={item._id}>
                            <ListGroup.Item style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <h6 className="mb-0">{item.producto} ${item.precio}</h6>
                                <div style={{display: 'flex'}}>
                                    <button className="btn btn-dark btn-md btn-block" onClick={() => handleEdit(item)}>Editar</button>
                                    <button className="btn btn-danger btn-md mx-1" onClick={() => handleDeleteProducto(item._id)}><AiFillDelete/></button>
                                    <a href={`/producto/${item._id}`} className="btn btn-light btn-md mx-1"  target="_blanck"><AiFillEye/></a>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    ))
                ): <div className="text-center" style={{width: '100%', marginTop: '60px'}}>
                        <img src={img} alt="no found producto" width="80px"/>
                        <h5 style={{fontWeight: 300}}>no tiene publicaciones</h5>
                    </div> 
                }
            </div> 
        </div>
    )
}

export default ListProductos
