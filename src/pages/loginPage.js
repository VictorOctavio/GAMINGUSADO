import React from 'react'

//Components
import LoginContainer from '../components/Login/loginContainer'
import Navbar from '../components/Navbar/navbar'

import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'


const LoginPage = (props) => {

    const token = useSelector(store => store.user.token);

    return (
        <div>
            <Navbar/>
            {
                token !== null ? (
                    props.history.push('/')
                ): <LoginContainer/>
            }
        </div>
    )
}

export default withRouter(LoginPage)
