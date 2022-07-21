import React from 'react'
import './footer.css'

//Iconst
import {FiFacebook, FiInstagram, FiLinkedin} from 'react-icons/fi'
//REDUX
import {useDispatch} from 'react-redux' 
import {subAction, contactoAction} from '../../redux/appDuck'

//Modal contacto
import Modale from '../Contacto/contacto';

import { NavLink } from 'react-router-dom'

const Footer = () => {
    const dispatch = useDispatch()

    const [sub, setSub] = React.useState('');
    const [subconfirm, setSubConfirm] = React.useState({sub: false, message: ''});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //STATES FORM
    const [message, setMessage] = React.useState({
        name: '',
        email: '',
        message: ''
    })

    //New sub
    const handleSub = (e) => {
      e.preventDefault();
      dispatch(subAction(sub, setSubConfirm));

    }

    //modal contacto 
    const [show, setShow] = React.useState(false)


    //GETDATA MESSAGE
    const onChangeMessage = e => {
        setMessage({
            ...message,
            [e.target.name]: e.target.value
        })
    }

    //Message 
    const handleSubmitMessage = e => {
        e.preventDefault()
        dispatch(contactoAction(message));
        setShow(false);
    }

    return (
        <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6>SOBRE NOSOTROS</h6>
                <p className="text-justify mb-0">Gaming Usado te ayuda a comprar y vender hardware que ya no usas de una manera sencilla, contactandoté directamente con el vendedor</p>
                <NavLink to="/preguntas-frecuentes">
                  <button className="pregfrecuentes">preguntas frecuentes</button></NavLink>
              </div>
    
              <div className="col-xs-6 col-md-3">
                <h6>SUBSCRIBIRSE</h6>
                {
                  subconfirm.sub ? (
                    subconfirm.message
                  ):(
                    <form onSubmit={handleSub}>
                      <input className="form-control" type="email" placeholder="email" style={{width: '98%'}} required onChange={e => setSub(e.target.value)} value={sub}/>
                      <button type="submit" className="btn-subscribirme">Subscribirme</button>
                    </form>
                  )
                }
                
              </div>
    
              <div className="col-xs-6 col-md-3">
                <h6 style={{textAlign: 'center'}}>Contacto</h6>
                <ul className="footer-links">          
                  <li><button className="contactanos btn-block py-2 rounded" onClick={handleShow}>Dejar Mensaje</button></li>
                  {
                    show && <Modale
                              show={show}
                              handleClose={handleClose}
                              onChangeMessage={onChangeMessage}
                              handleSubmitMessage={handleSubmitMessage}
                              message={message}
                            />
                  }
                </ul>
              </div>
            </div>

            <hr />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text">Copyright &copy; 2021 Derechos Reservados
                </p>
              </div>
    
              <div className="col-md-4 col-sm-6 col-xs-12">
                <ul className="social-icons" style={{marginTop: '-10px'}}>
                  <li><a className="facebook" href="https://www.facebook.com/" target="_blanck"><FiFacebook/></a></li>
                  <li><a className="dribbble"  href="https://www.instagram.com/gamingusado/" target="_blanck"><FiInstagram/></a></li>
                  <li><a className="linkedin" href="https://www.linkedin.com/in/victor-octavio-gauna-62b0a2202/" target="_blanck"><FiLinkedin/></a></li>   
                </ul>
              </div>
            </div>
          </div>

    </footer>
    )
}

export default Footer
