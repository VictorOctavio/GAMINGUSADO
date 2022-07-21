import React from 'react'

//Components
import Navbar from '../components/Navbar/navbar';
import Producto from '../components/Producto/producto';
import Footer from '../components/Footer/footer';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProductoAction } from '../redux/appDuck';

const ProductoPage = () => {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getProductoAction())
  }, [dispatch]);

  const producto = useSelector(store => store.app.producto)

  return (
    <React.Fragment>
      <Navbar />
      <Producto producto={producto} />
      <Footer />
    </React.Fragment>
  )
}

export default ProductoPage
