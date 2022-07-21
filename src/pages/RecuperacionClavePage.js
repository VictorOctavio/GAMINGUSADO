import React, { useState } from 'react'
import Config from '../config';

const photo = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1623759122/seguridad_hjtnxf.png';

export const RecuperarClavePage = (props) => {

    //States Contraseñas
    const [password, setPassword] = useState({
        password: '', confirmPassword: ''
    })
    //Err/EXITO & LOADING
    const [err, setErr] = useState({active: false, message: ''});
    const [loading, setLoading] = useState(false);

    //Capturar value inputs passaword
    const onChangePassword = e => {
        setPassword({
            ...password, [e.target.name]: e.target.value
        })
    }

    //Submit Password
    const handleSubmitPassword = async(e) => {
        try{
            e.preventDefault();
            setLoading(true);
            
            if(password.password !== password.confirmPassword) return setErr({active: true, message: 'Contraseñas no coinciden'});

            const token = window.location.pathname.split('/')[2];
            
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({password: password.password})
            }

            const res = await fetch(`${Config.URI}/recuperar`, config);
            const data = await res.json();

            if(data.err) return setErr({active: true, message: data.message});

            setErr({active: true, message: 'CONTRASEÑA ACTUALIZADA'});

            setTimeout(() => {
                window.location.replace(`${Config.URL}/ingresar`);
            }, 2500);

        }catch(err){console.log(err)}
    }

    return (
        <div style={{
            backgroundImage: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <div className="card col-12 col-lg-4" style={{ width: '50rem', background: 'inherit' }}>

                <div className="card-header col-12">
                    <h3 className="text-light text-center mb-0 font-weight-bold">RESTAURAR CLAVE</h3>
                </div>

                <img className="col-6 mx-auto" src={photo} alt="Recuperar cuenta" width="100" />

                <div className="card-body">
                    <form className="col-12" onSubmit={handleSubmitPassword}>
                        {err.active && (
                            <div className="alert alert-light text-center" style={{opacity: .8}}>{err.message}</div>
                        )}

                        <label className="text-light mb-0">Nueva Clave</label>
                        <input required name="password" type="password" className="form-control" placeholder="Password" 
                        onChange={onChangePassword}
                        />

                        <label className="text-light mb-0 mt-1">Confirmar Nueva Clave</label>
                        <input required name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" 
                        onChange={onChangePassword}
                        />

                        <button disabled={loading} className="btn btn-block btn-warning mt-3">
                            {!loading?'Cambiar Contraseña': '...'}
                        </button>
                    </form>
                </div>

            </div>

        </div>
    )

}