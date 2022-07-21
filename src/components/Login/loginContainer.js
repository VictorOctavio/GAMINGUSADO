import React from 'react'

//Components
import Login from './login'

//Redux
import {useDispatch, useSelector} from 'react-redux'
import {RegisterUserAction, LoginUserAction} from '../../redux/userDuck'

//URI
import Config from '../../config'

const LoginContainer = () => {

    //Dispath Initialization
    const dispatch = useDispatch()
    const token = useSelector(store => store.user.token);

    //STATES
    const [newUser, setNewUser] = React.useState({
        username: '',
        email: '',
        password: ''
    })

    const [login, setLogin] = React.useState(false);

    // VALIDACIONES ERROS
    const [err, setErr] = React.useState({err: false, message: ''});
    const [sendEmial, setSendEmail] = React.useState({err: true, message: ''});
    const [loading, setLoading] = React.useState(false);

    //Restauracion Clave
    const [restaurarClave, setRestaurarClave] = React.useState({message: '', active: false});

    //CHANGE STATE LOGIN FORM
    const handleLogin = () => {
        setLogin(!login)
    }

    //CAPTURAR VALORES FORM
    const ChangeForm = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    //ENVIAMOS FORMULARIO SUBMIT
    const handleSubmit = e => {
        e.preventDefault();
        
        //Verificamos si es registro o ingreso session
        if(login) dispatch(LoginUserAction(newUser, setErr, setLoading));  
        else dispatch(RegisterUserAction(newUser, setErr, setSendEmail, setLoading));
        
        //Login exitoso -> token -> redirección al main page
        if(token){window.location.replace(`${Config.URL}`)}
    }
        

    //HTML LOGIN PAGE
    return (
        <div>
            <Login
                ChangeForm={ChangeForm}
                handleSubmit={handleSubmit}
                login={login}
                handleLogin={handleLogin}
                err={err}
                sendEmial={sendEmial}
                loading={loading}
                restaurarClave={restaurarClave}
                setRestaurarClave={setRestaurarClave}
            />
        </div>
    )
}

export default LoginContainer
