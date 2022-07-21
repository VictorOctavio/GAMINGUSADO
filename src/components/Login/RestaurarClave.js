import React, { useState } from 'react';

//REACT ICONST
import {TiArrowLeft} from 'react-icons/ti'

import Config from '../../config';

export const RestaurarClave = ({setRestaurarClave}) => {

    const [email, setEmail] = useState('');
    const [resMessage, setResMessage] = useState({ message: '', active: false });
    const [loading, setLoading] = useState(false);

    const onChange = e => {
        setEmail(e.target.value);
    }

    const onSubmitRecuperacion = async(e) => {
        e.preventDefault();

        setLoading(true);

        const config = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email})
        }

        const res = await fetch(`${Config.URI}/recuperarClave`, config);
        const data = await res.json();

        setResMessage({active: true, message: data.message});
    }

    return (
        <div>
            <h4 className="text-center">RECUPERACIÓN DE CLAVE</h4>
            {!resMessage.active ? (
                <>
                    <form onSubmit={onSubmitRecuperacion} >
                        <input type="email" required name="email" placeholder="Ingresa email: " className="form-control" onChange={onChange} />
                        <button disabled={loading} className="btn btn-block btn-warning mt-2">Recuperar Contraseña</button>
                    </form>
                </>
            ) : (
                <div className="alert alert-warning text-center" role="alert"><b>{resMessage.message}</b></div>
            )}
            
            <button className="btn text-dark btn-block text-center mt-3 p-0"
                    onClick={() => setRestaurarClave({ active: false })}
                ><TiArrowLeft/>Volver</button>
        </div>
    )

}