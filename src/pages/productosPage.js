import React from 'react'

import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import Productos from '../components/Productos/productos';

const ProductosPage = () => {
    return (
        <React.Fragment>
            <Navbar/>

            <Productos/>

            <Footer/>
        </React.Fragment>
    )
}

export default ProductosPage
