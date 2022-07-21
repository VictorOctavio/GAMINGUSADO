import React from 'react'
//Components
import Guardados from '../components/guadados/guardados'
import Footer from '../components/Footer/footer'
import Navbar from '../components/Navbar/navbar'

const GuardadosPage = () => {
    return (
        <React.Fragment>    
            <Navbar/>
            <Guardados/>
            <Footer/>
        </React.Fragment>
    )
}

export default GuardadosPage
