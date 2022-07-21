import React, { useState } from 'react';
import conf from '../config';

const photo = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1623759122/seguridad_hjtnxf.png';

const ValidateEmail = () => {

    const [state, setState] = useState({ active: false, message: '' });

    React.useEffect(() => {
        handleValidateEmail();
    }, [])

    const handleValidateEmail = async () => {
        const token = window.location.pathname.split('/')[2];
        const URI = conf.URL;

        const config = {
            method: 'GET',
            headers: {
                'auth-token': token
            }
        }

        const res = await fetch('http://localhost:8080/api/confirmEmail', config);
        const data = await res.json();

        if (data.err) setState({ active: true, message: 'No se puedo confirmar cuenta!' })
        else {
            localStorage.setItem('token', token);
            setState({ active: true, message: data.message })
        }

        setTimeout(() => {
            window.location.replace(`${URI}/ingresar`);
        }, 3000)
    }

    return (
        <div style={{
            backgroundImage: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {
                !state.active ? (
                    <div className="card" style={{ width: '18rem', background: 'inherit' }}>
                        <img src={photo} className="card-img-top" alt="confirm-mail" />
                        <div className="card-body">
                            <h3 className="btn-warning btn-lg btn-block text-center">Confirmar Email</h3>
                        </div>
                    </div>
                ) : <div className="card" style={{ width: '18rem', background: 'inherit' }}>
                    <img src={photo} className="card-img-top" alt="confirm-mail" />
                    <div className="card-body">
                        <h3 className="btn-warning btn-lg btn-dark text-center">{state.message}</h3>
                    </div>
                </div>
            }


        </div>
    )
}

export default ValidateEmail
