import React, { useState } from 'react'
import './producto.css'
import '../spiner.css'

//Icons
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaPhoneSquareAlt, FaWhatsapp } from 'react-icons/fa'

//Components
import Relacionados from './relacionados/relacionados'

//REDUX
import { useDispatch } from 'react-redux';
import { favoritoAction } from '../../redux/appDuck';

//REDIRECT
import { withRouter } from 'react-router-dom'


const img = 'https://www.flaticon.com/premium-icon/icons/svg/1881/1881035.svg'

const Producto = ({ producto, history }) => {

    const dispatch = useDispatch() //INITIALIZAR DISPATCH REDUX

    const handleFavorito = (productoId, producto) => {
        dispatch(favoritoAction(productoId, producto))
    }

    const [imgActive, setImgActive] = useState('');


    return (
        <>
            <div className="producto-container">
                {
                    producto !== null ? (
                        <>
                            <div className="c-producto">
                                <div className="row producto">

                                    <div className="p-image col-12 col-lg-5">

                                        <div className="imgs">
                                            {
                                                producto.ImageURL.map((image, i) => (
                                                    <img className={imgActive === image ? 'active' : ''} key={i} alt={image} src={image}
                                                        onClick={() => setImgActive(image)}
                                                    />
                                                ))
                                            }
                                        </div>

                                        <img src={imgActive || producto.ImageURL[0]} className="image-active" alt="producto" />
                                    </div>

                                    <div className="p-description col-12 col-lg-7">
                                        <div className="p-texto px-2">
                                            <h3 className={producto.producto.length > 30 ? 'length-name-long': ''}>{producto.producto}</h3>
                                            <strong>{producto.categoria}</strong>
                                        </div>

                                        <div className="p-detalles">
                                            <div className="detalles">
                                                <h6>Descipcion del vendedor</h6>
                                                <p>{producto.descripcion || 'El vendedor no incluyó descripción.'}</p>
                                            </div>
                                            <strong>{producto.precio === 0 ? 'GRATIS' : `$${producto.precio}`}</strong>
                                        </div>

                                        <div className="p-contacto mt-3">
                                            <div className="contac">
                                                <h6 className="mb-0 text-light">CONTACTO</h6>
                                                <strong>{producto.email}</strong>
                                                <p className="mb-0"><FaPhoneSquareAlt />{producto.phone}</p>
                                            </div>

                                            <div className="d-flex px-2">
                                                <button className="btn btn-dark btn-lg contac-save" onClick={() => handleFavorito(producto._id, producto.producto)}><BsFillBookmarkFill className="pb-1"/> Guardar</button>
                                                <a className="whatsapp btn btn-success btn-lg mx-2 contac-whatsapp" href={`https://api.whatsapp.com/send?phone=54${producto.phone}&text=¿Sigue%20Disponible%20${producto.producto}?`} target="_black"><FaWhatsapp/> Preguntar</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Relacionados
                                categoria={producto.categoria}
                                id={producto._id}
                            />
                        </>
                    ) : (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '150px' }}>
                            <img src={img} alt="IMG-NO-ENCONTRADA" width="50px" />
                            <h2 style={{ textAlign: 'center', fontWeight: '300' }}>Buscando Publicación</h2>
                            <button className="btn btn-info" onClick={() => history.push('/productos')}>Seguir Navegando</button>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default withRouter(Producto)

