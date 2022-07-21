import React from 'react'
import '../spiner.css'

//Redux
import {useDispatch, useSelector} from 'react-redux';
import {getProductosAction, getCategoriaProductos} from '../../redux/appDuck';

//Components
import Card from '../Card/card';
import Filtros from './filtros';

//REDIREC
import {withRouter} from 'react-router-dom'

const img = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1615377457/gamer_la1c3v.png'

const Productos = (props) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getCategoriaProductos())
    }, [dispatch])

    const productos = useSelector(store => store.app.productos);
    const productos_categoria = productos.docs || null;

    const {hasNextPage, hasPrevPage, page} = productos;

    const handlePagination = e => {
        if(e.target.name === 'prev'){
            dispatch(getProductosAction(6, page - 1))
            return 
        }else{
            dispatch(getProductosAction(6, page + 1));
            return 
        }
    }

    const handleReload = ()  => {
        props.history.push('/productos');
        dispatch(getProductosAction());
    }
    
    return (
        <div className="mt-5 container" style={{minHeight: '550px'}}>

            <div className="row">
                <div className="col-12"><Filtros/></div>
            </div>

            <div style={{minHeight: '555px'}} className="row">
                <div className="col-12"></div>
            {
                productos_categoria !== null ? (
                    productos_categoria.length !== 0 ? (
                        productos_categoria.map(item => (
                            <div className="col-12 col-md-6 col-lg-3 col-xl-4 my-5" key={item._id}>
                                <Card item={item}/>
                            </div>
                        ))
                    ): <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px'}}>
                            <img src={img} alt="IMG-NO-ENCONTRADA" width="100px"/>
                            <h3 style={{textAlign: 'center', fontWeight: '300'}}>NO SE ENCONTRARON RESULTADOS</h3>
                            <button className="btn btn-info" onClick={() =>  handleReload()}>Seguir Navegando</button>
                        </div>
                ): <div className="contain-loading"><div className="lds-facebook"><div></div><div></div><div></div></div></div>
            }
            </div>

            {
                productos_categoria !== null && (
                <div className="col-md-12 d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <button disabled={!hasPrevPage} name="prev" className="btn page-link" onClick={handlePagination}>Previous</button>
                            </li>
                
                            <li className="page-item">
                                <button disabled={!hasNextPage} name="next" className="btn page-link" onClick={handlePagination}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
                )
            }
        </div>
    )
}

export default withRouter(Productos)
