import React from 'react'

//modal Bootstrap
import {Button, Modal} from 'react-bootstrap'

const Contacto = ({handleClose, onChangeMessage, handleSubmitMessage, show, message}) => {

  

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Contactanos</Modal.Title>
                </Modal.Header>

                <form onSubmit={handleSubmitMessage}>
                    <Modal.Body>  
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <input style={{width: '49%'}} 
                            type="text" name="name" placeholder="Nombre:" className="form-control" value={message.name} required
                            onChange={onChangeMessage}/>

                            <input style={{width: '49%'}} 
                            type="email" name="email" placeholder="Email:" className="form-control" value={message.email} required
                            onChange={onChangeMessage}/>
                        </div>
                        
                        <textarea style={{minHeight: '200px', maxHeight: '200px'}} 
                        name="message" className="form-control mt-3" 
                        placeholder="Escribí tu Consulta:" required 
                        onChange={onChangeMessage} value={message.message} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        <Button type="submit" variant="primary">Enviar</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default Contacto
