import React from 'react';
import './recientes.css';

import Card from '../Card/card';
import '../spiner.css'
import {withRouter} from 'react-router-dom'
const Recientes = (props) => {   
    
    let productos_recientes = props.productos.docs || null; 
    
    //BTN VER MAS
    const handleProductos = () => {
        props.history.push('/productos/all')
    }
    
    return (
       <React.Fragment>
           <section className="recientes-title"><h3>Ultimas Publicaciones</h3></section>

           <section className="container">
               <div className="row mt-3">
                   {
                    props.loading ? (
                        <div className="contain-loading"><div className="lds-facebook"><div></div><div></div><div></div></div></div>
                    ): (
                        productos_recientes !== null ? (
                            productos_recientes.map(item => (
                                <div className="col-12 col-md-6 col-lg-3 col-xl-4 mt-5 mb-1" key={item._id}>
                                    <Card item={item}/>
                                </div>
                            ))
                    ): <div className="contain-loading"><div className="lds-facebook"><div></div><div></div><div></div></div></div>)
                   }     
               </div>

               <div className="col-12 text-center mt-5">
                   <button onClick={handleProductos} className="btn-vermas">ver más</button>
               </div>
           </section>
       </React.Fragment>
    )
}

export default withRouter(Recientes)
