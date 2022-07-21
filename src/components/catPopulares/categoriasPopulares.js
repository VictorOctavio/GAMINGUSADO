import React from 'react'
import './cpopulares.css'

//WITCH ROUTER
import {withRouter} from 'react-router-dom'
//Categorias
import Categorias from '../../services/categorias'

const CategoriasPopulares = (props) => {
    
    const handleCategoria =(categoria)=> {
        props.history.push(`/productos/${categoria}`)
    }

    return (
        <div className="c-container">
            <div className="p-categorias">
                <h2>Categorias</h2>
                <div className="row c-lista">
                    {
                    Categorias.map(item => (
                        <div className="c-card col-4 col-lg-2 col-xl-1" key={item.name} onClick={() => handleCategoria(item.name)}>
                            <div className="icon">
                                {item.icon}
                            </div>

                            <div className="c-name">
                                <p>{item.name}</p>
                            </div>
                        </div>
                    ))  
                    
                    }
                </div>

            </div>
        </div>
    )
}

export default withRouter(CategoriasPopulares)
