import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Pages
import Main from './pages/mainPage';
import Producto from './pages/productoPage';
import LoginPage from './pages/loginPage';
import UserPage from './pages/userPage';
import PagenoFound from './pages/404';
import ProductosPage from './pages/productosPage';
import GuardadosPage from './pages/guardadosPage';
import ScrollTop from './components/ScrollTop';
import Toasts from './components/Toasts';
import AdminPage from './pages/Admin/adminPage';
import PreguntasPage from './pages/preguntasPage';
import ValidateEmail from './pages/validateEmail';
import { RecuperarClavePage } from './pages/RecuperacionClavePage';

//Contact
import Contacto from './components/Contacto/contacto'

import {useDispatch} from 'react-redux'
import {verifyAdmin} from './redux/administradorDuck';

const App = () => {

  const dispatch = useDispatch()

  React.useEffect(() => {
      dispatch(verifyAdmin())
  }, [dispatch])

  return(
    <React.Fragment>
      <Router>
        <ScrollTop/>
        <Toasts/>
        <Switch>
          
          <Route path="/" component={Main}  exact/>

          <Route path="/ingresar" component={LoginPage} exact/>

          <Route path={`/micuenta/:token?`} component={UserPage} exact/>

          <Route path={`/producto/:id`} component={Producto} exact/> 

          <Route path={`/productos/:id?`} component={ProductosPage} exact/>

          <Route path={`/guardados/:id?`} component={GuardadosPage} exact/>

          <Route path={`/preguntas-frecuentes`} component={PreguntasPage} exact/>

          <Route path={`/contacto`} component={Contacto} exact/>

          <Route path={`/validar-email/:token`} component={ValidateEmail} exact/>

          <Route path={`/recuperar-clave/:token`} component={RecuperarClavePage} exact/>

          <Route path={`/admin`} component={AdminPage} exact/>

          <Route component={PagenoFound}/> 
          
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App;
