import React from 'react'
import './login.css'

//React Bootstrap
import { Spinner } from 'react-bootstrap';

//Components
import { RestaurarClave } from './RestaurarClave';

//Logo
const logo = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1631216888/usadoGamer/login_qvusbo.png'

const Login = ({ ChangeForm, handleSubmit, handleLogin, login, err, sendEmial, loading, setRestaurarClave, restaurarClave }) => {

    return (
        <div className="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div className="container">
                <div className="card login-card  mt-5">
                    <div className="row no-gutters">

                        <div className="col-md-6 my-auto login-img-container">
                            <img src={logo} alt="login" className="login-card-img" />
                        </div>

                        <div className="col-md-6  my-auto">

                            <div className="card-body" style={{ border: 'none' }}>

                                {
                                    //RESTAURAR CLAVE TRUE -> COMPONENT RETAURAR 
                                    restaurarClave.active ? (
                                        <RestaurarClave setRestaurarClave={setRestaurarClave}/>
                                    ) : (
                                        
                                        // MUESTRA FORMULARIO DE ACCESOS O REGISTRO DE SESSION
                                        <>
                                            {
                                                // IMPRIMI TARJETA DE ALERTA DE ERROR
                                                err.err && (
                                                    <div className="alert alert-danger text-center" role="alert">{err.message}</div>
                                                )
                                            }

                                            
                                            <h4 className="title-login">{login ? 'Iniciar Sesión' : 'Registrarse'}</h4>

                                            {
                                                // EVENTO SUBMIT NO DADO MUESTRA FORMULARIO
                                                sendEmial.err ? (
                                                    <form onSubmit={handleSubmit}>
                                                        {
                                                            // CAMPO NICKNAME SOLO EN EL REGISTRO
                                                            !login && (
                                                                <input type="text" name="username" className="form-control" placeholder="Nickname:" onChange={ChangeForm} />
                                                            )
                                                        }
                                                        <input type="email" name="email" className="form-control mt-2" placeholder="Correo Electrónico:" onChange={ChangeForm} />
                                                        <input type="password" name="password" className="form-control mt-2" placeholder="Contraseña:" onChange={ChangeForm} />

                                                        
                                                        {!loading ? (
                                                            // EVENTO SUBMIT NO DADO -> BUTTON DEFAULT
                                                            <input className="btn btn-block btn-dark mt-2" type="submit" value={login ? 'Ingresar' : 'Crear Cuenta'} />
                                                        ) : (
                                                            // EVENTO SUBMIT NO DADO -> BUTTON SPINNER
                                                            <button disabled={loading} className="btn btn-block btn-dark mt-2"><Spinner animation="border" size="sm" /></button>
                                                        )}

                                                    </form>
                                                ) : (
                                                    // EVENTO SUMBIT DADO & !ERR -> TARJETA VALIDACION DE EMAIL
                                                    <div className="alert alert-success mt-2 text-center" role="alert">{sendEmial.message}</div>
                                                )
                                            }


                                            {
                                                // VALIDAMOS QUE ENVENTO SUMBIT NO FUE DADO
                                                sendEmial.err && (
                                                    // MUESTRA BTN DE RECUPERACION DE CUENTA Y LOGEARSE/REGISTRARSE
                                                    <>
                                                        <button className="btn text-info btn-block text-center mb-0 mt-2 p-0" onClick={handleLogin}>{!login ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}</button>
                                                        {login && (
                                                            <button className="btn text-dark btn-block text-center m-0 p-0"
                                                                onClick={() => setRestaurarClave({ active: true })}
                                                            >¿Olvidaste tu Contraseña?</button>
                                                        )}
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }



                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
