import React from 'react'

//Components
import Navbar from '../components/Navbar/navbar'
import Footer from '../components/Footer/footer'
import ProductoContainer from '../components/User/productoContainer'

//REDDUX
import {useSelector} from 'react-redux';

//REDIRECT
import {withRouter} from 'react-router-dom'

const UserPage = (props) => {

    const token = useSelector(store => store.user.token);

    return (
        <div>
            {
               token !== null ? (

                   <React.Fragment>

                       <Navbar/>

                        <ProductoContainer/>

                       <Footer />

                   </React.Fragment>

               ): props.history.push('/ingresar')
            }
        </div>
    )
}

export default withRouter(UserPage)
