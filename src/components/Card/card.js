import React, { useRef } from 'react'
import './card.css'
import {withRouter} from 'react-router-dom';

//REDIRECT
import config from '../../config'

//Moment JS
import moment from 'moment'
import 'moment/locale/es' // Pasar a español

//Animations
import Animate from '../Animations/gsap'

const photoDefault = 'https://images-na.ssl-images-amazon.com/images/I/61j5LUeKx4L._SL1500_.jpg';

const Card = (props) => {

    //Animation
    let aniImage = useRef(null)
    React.useEffect(() => {
        Animate.loadProducts(aniImage)
    }, [])

    const handleProducto = (id) => {
        window.location.replace(`${config.URL}/producto/${id}`);
    }

    //Redirec categoria click card
    const handleCategoria = (categoria) => {
        const urlActual = window.location.pathname.split('/')[1];

        if(urlActual === 'productos'){
            window.location.replace(`${config.URL}/productos/${categoria}`);
        }else props.history.push(`/productos/${categoria}`);
       
    }

    return (
        <div ref={el => { aniImage = el }} className="card card-productos" style={{ width: '100%' }} >

            <div className="card-div">
                <img loading="lazy" src={props.item.ImageURL[0] || photoDefault} className="card-img-top" alt={props.item.descripcion || 'TITLE'}  title={props.item.descripcion}/>
            </div>

            <div className="card-body">
                <p className="card-text producto-title" title={props.item.producto.toUpperCase()}
                    >{props.item.producto.toUpperCase() || 'PRODUCTO TITLE'}
                </p>

                <div className="d-flex justify-content-between align-items-end my-2">
                    <strong onClick={() => handleCategoria(props.item.categoria)} className="card-text mb-0 categoria-card" title={`ver más ${props.item.categoria.toUpperCase()}`}>
                        {props.item.categoria}
                    </strong>

                    <h5 style={{ fontWeight: 300, fontSize: '25px' }} className="card-text mb-0">{props.item.precio === 0 ? 'GRATIS' : `$${props.item.precio}`}</h5>
                </div>

                <strong style={{ display: 'flex', justifyContent: 'start', fontWeight: '400', color: '#7B7B7B' }}>
                    {moment(props.item.createdAt).startOf('hour').fromNow()}
                </strong>

                {!props.guardado && <button className="btn btn-info btn-block my-2" onClick={() => handleProducto(props.item._id)} >Ver publicacón</button>}
            </div>

        </div>
    )
}

export default withRouter(Card)
