import React from 'react'
import './relacionado.css'
//Card
import Card from '../../Card/card'
//Redux
import {useDispatch, useSelector} from 'react-redux';
import {getRelacionados} from '../../../redux/appDuck';
//REDIREC
import {withRouter} from 'react-router-dom'
import '../../spiner.css'

const image = "https://res.cloudinary.com/dyntggmrp/image/upload/v1615377457/gamer_la1c3v.png"


const Relacionados = ({categoria, id, history}) => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getRelacionados(categoria))
    }, [dispatch, categoria])

    const relacionados = useSelector(store => store.app.productos)
    const productos_relacionados = relacionados.docs || null

    return (    
        <section className="relacionados">

            <div className="title-relacionado"><h2>Podría Interesarte</h2></div>

            <div className="c-relacionado">
                {
                    productos_relacionados !== null ? (
                        productos_relacionados.length > 1 ? (
                            productos_relacionados.map(item => (
                                item._id !== id && (
                                    <div className="col-10 col-sm-6 col-md-4 col-lg-3 mx-1" key={item._id}>
                                        <Card item={item}/>
                                    </div> 
                                )
                            ))
                        ):(
                            <div className="text-center" style={{width: '100%', marginTop: '60px'}}>
       
                                <img src={image} alt="no found producto" width="70px"/>
                                <h5 style={{fontWeight: 300}} className="mb-0">no se encontraron relacionados</h5>
                                <button className="btn" onClick={() => history.push('/productos/all')}>Explorar otros</button>
                            </div>
                        )   
                    ): <div className="contain-loading"><div className="lds-facebook"><div></div><div></div><div></div></div></div>

                }      
            </div>

        </section>
    )
}

export default withRouter(Relacionados)

