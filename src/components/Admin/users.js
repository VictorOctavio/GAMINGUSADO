import React from 'react'
import './admin.css'
//React Bootstraps
import { ListGroup, Modal, Form } from 'react-bootstrap'

//REDUX
import { useDispatch } from 'react-redux'
import { bloquedUser, desboquedUser, sendMail } from '../../redux/administradorDuck'

//Moment JS
import moment from 'moment'
import 'moment/locale/es' // Pasar a español

//ICONS
import { IoLockClosed, IoLockOpen } from 'react-icons/io5'



const Users = ({ data, GetUserActions }) => {

    let usuarios = data.docs || null;
    const { hasPrevPage, hasNextPage, page } = data || false;

    const dispatch = useDispatch() //INITIALIZATION DISPATCH

    //modal
    const [show, setShow] = React.useState(false);
    //data menssage
    const [newMail, setNewEmail] = React.useState({
        title: '',
        destino: 'todos',
        message: ''
    })


    const handlePagination = (e) => {
        const btn = e.target.name

        if (btn === 'next') {
            return dispatch(GetUserActions(3, page + 1))
        } else {
            return dispatch(GetUserActions(3, page - 1))
        }
    }


    const handleBloqued = (id, bloqued) => {
        if(!bloqued){
            dispatch(bloquedUser(id));
        }else{
            dispatch(desboquedUser(id)); 
        }
    }


    const onChangeMessage = (e) => {
        setNewEmail({
            ...newMail,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitMail = (e) => {
        e.preventDefault();

        if(!newMail.title.trim() && !newMail.message.trim()) return console.log('Campos son Obligatorios');

        
        dispatch(sendMail(newMail));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <button className="btn btn-dark my-3" onClick={() => setShow(!show)}>Enviar Email Usuarios</button>
                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title" className="col-12">
                                Enviar Email
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form classname="col-12" onSubmit={handleSubmitMail}>
                                <Form.Group controlId="exampleForm.ControlSelect2">
                                    <Form.Control as="select" name="destino" onChange={onChangeMessage}>
                                        <option value="todos">Todos</option>
                                        <option value="subs">Subs</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" name="title" placeholder="Titulo" onChange={onChangeMessage} />
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" name="message" rows={3} placeholder="Ingresa mensaje" onChange={onChangeMessage} />
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <button className="btn btn-block btn-dark">Enviar Mails</button>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>


            <div className="row">
                <div className="col-12">
                    <ListGroup>
                        {usuarios !== null && (
                            usuarios.length > 0 ? (
                                usuarios.map(item => (
                                    <ListGroup.Item key={item._id}>
                                        <div className="lista-usuarios-admin">
                                            <div>
                                                <h6 className="mb-0">{item.email}</h6>
                                                <p className="mb-0 text-info">{moment(item.createdAt).format("Do MMMM YYYY")}</p>
                                            </div>

                                            {
                                                item.bloqued ? (
                                                    <button className="btn btn-success mx-1" onClick={() => handleBloqued(item._id, item.bloqued)}><IoLockOpen /></button>
                                                ):(
                                                    <button className="btn btn-danger mx-1" onClick={() => handleBloqued(item._id, item.bloqued)}><IoLockClosed /></button>
                                                )
                                            }
                                            


                                        </div>
                                    </ListGroup.Item>
                                ))
                            ) : 'NO HAY USUAIOS REGISTRADOS'
                        )}

                        <ListGroup.Item>
                            <div className="d-flex justify-content-center">
                                <button name="prev" disabled={!hasPrevPage} onClick={handlePagination} className="btn btn-outline-dark mx-1 btn-sm">prev</button>
                                <button name="next" disabled={!hasNextPage} onClick={handlePagination} className="btn btn-dark btn-sm">next</button>
                            </div>
                        </ListGroup.Item>

                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default Users

