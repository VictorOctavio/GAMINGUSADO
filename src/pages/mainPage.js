import React from 'react'
import Footer from '../components/Footer/footer'

// Components
import Navbar from '../components/Navbar/navbar'
import Recientes from '../components/Recientes/recientes'
import Slider from '../components/Slider/slider'
import CategoriasPopulares from '../components/catPopulares/categoriasPopulares'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {getProductosAction} from '../redux/appDuck'

const MainPage = () => {

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getProductosAction(12))
    }, [dispatch])

    const productos = useSelector(store => store.app.productos)
    const loading = useSelector(store => store.app.loading)

    return (
        <React.Fragment>
           <Navbar/>
           <Slider/>
           <Recientes productos={productos} loading={loading}/>
           <CategoriasPopulares/>  
           <Footer/>
        </React.Fragment>
    )
}

export default MainPage
