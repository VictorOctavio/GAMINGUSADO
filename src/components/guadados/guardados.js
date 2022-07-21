import React from 'react';
import './guardados.css';

//REDIRECT
import config from '../../config';

import {withRouter} from 'react-router-dom'

//Components
import Card from '../Card/card'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {getfavoritoaction, deleteFavoritoAction} from '../../redux/appDuck'

//Icons
import {AiFillDelete} from 'react-icons/ai'

const Guardados = (props) => {

    const dispatch = useDispatch() //Initialization Dispatch Redux

    React.useEffect(() => {
        dispatch(getfavoritoaction())
    }, [dispatch])

    const favoritos = useSelector(store => store.app.favoritos);
    const productos = favoritos.data || null;

    const handleDeleteFavorito = (id) => {
        dispatch(deleteFavoritoAction(id));
    }

    return (
        <div className="container guardados-container">
            <section className="row" style={{minHeight: '67vh', marginTop: '150px'}}>
                {
                    productos !== null && productos.length > 0 ? (
                        <>
                        <div className="col-12 text-center"><h2 style={{fontWeight: 300}}>GUARDADOS</h2></div>
                        {
                            productos.map(item => (
                                <div className="col-12 col-md-6 col-lg-4 my-2" key={item._id}>
                                    <Card item={item} guardado={true}/>
                                    <div className="buttons-guardados">
                                        <a className="btn btn-primary" target="_black" href={`${config.URL}/producto/${item._id}`}>ver</a>
                                        <button className="btn btn-danger ml-1" onClick={() => handleDeleteFavorito(item._id)}><AiFillDelete/></button>
                                    </div>
                                </div>
                            ))
                        }
                        </>
                    ):(
                        <div className="section-guardados">
                            <div className="noProductos">
                                <h3 className="text-center">NO HAY PRODUCTOS GUARDADOS</h3>
                                <button className="btn btn-info" onClick={() => props.history.push('/productos')}>Ver Productos</button>
                            </div>
                        </div>  
                    )   
                }  
            </section>
        </div>
    )
}

export default withRouter(Guardados)
