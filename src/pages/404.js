import React from 'react'

import {withRouter} from 'react-router-dom'

const img = 'https://i.pinimg.com/originals/f3/24/4b/f3244b2061e2d14c7454cbc5fdba012a.jpg'
const Page404 = (props) => {
    return (
        <>
        <div className="row " style={{
            margin: '0 auto',
            minHeight: '100vh',
            width: '100%',
            display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'
        }}> 
            <div className="col-md-12 d-flex justify-content-center">
                <img className="mx-auto" src={img} alt="404" width="400px"/>
            </div>
            
            <div className="col-md-12 d-flex  flex-column align-items-center">
                <h3 className="mb-0" style={{color: '#000'}} >HEMOS PERDIDO LA CONECCIÓN</h3>
                <stron style={{color: 'tomato'}} className="mb-3">OCURRIÓ ALGO INESPERADO</stron>
                <button className="btn btn-info btn-md" style={{width: '30%'}} onClick={() => props.history.push("/")}>Ir la Inicio</button>        
            </div>
        </div>
        </>
    )
}

export default withRouter(Page404)
