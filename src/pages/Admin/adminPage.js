import React from 'react'

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { GetUserActions, getMessagesAcions } from '../../redux/administradorDuck';
import { getProductosAction } from '../../redux/appDuck';

//Components
import Publications from '../../components/Admin/publications';
import Users from '../../components/Admin/users';
import Messages from '../../components/Admin/messages';

//REACT BOOTSTRAP
import { Navbar, Nav } from 'react-bootstrap'

//REDIRECT 
import { withRouter } from 'react-router-dom'


const AdminPage = ({ history }) => {

    const dispatch = useDispatch() //  Initialization dispatch
    const users = useSelector(store => store.administrador.users) //Usuarios List
    const messages = useSelector(store => store.administrador.messages) //Messages List
    const productos = useSelector(store => store.app.productos) //Productos List
    const activeAdmin = useSelector(store => store.administrador.admin) //Admin access

    //EJECUTAR ANTES QUE EL DOM
    React.useEffect(() => {
        // dispatch(verifyAdmin());
        dispatch(getProductosAction(30));
        dispatch(GetUserActions(30));
        dispatch(getMessagesAcions(30));
    }, [dispatch])

    //STATES ACTIVE
    const [viewActive, setViewActive] = React.useState({
        publicaciones: true,
        messages: false,
        users: false
    })

    //ViewActiveChange
    const handleViewActive = (e) => {
        const viewActive = e.target.name;

        if (viewActive === 'publicaciones') {
            return setViewActive({ publicaciones: true, messages: false, users: false })
        }

        if (viewActive === 'usuarios') {
            return setViewActive({ publicaciones: false, messages: false, users: true })
        }

        if (viewActive === 'messages') {
            return setViewActive({ publicaciones: false, messages: true, users: false })
        }

    }

    return (
        <React.Fragment>
            {
                activeAdmin ? (
                    <>

                        <Navbar expand="lg" variant="dark" bg="dark">
                            <div className="container">
                                <Navbar.Brand onClick={() => { history.push('/') }}>ADMIN</Navbar.Brand>

                                <Nav className="mr-auto">
                                    <Nav.Link name="publicaciones" onClick={handleViewActive}>Publicaciones</Nav.Link>
                                    <Nav.Link name="usuarios" onClick={handleViewActive}>Usuarios</Nav.Link>
                                    <Nav.Link name="messages" onClick={handleViewActive}>Messages</Nav.Link>
                                </Nav>
                            </div>
                        </Navbar>


                        <div className="mt-5">
                            {viewActive.publicaciones && (
                                <Publications data={productos} getProductosAction={getProductosAction} />
                            )}

                            {viewActive.messages && (
                                <Messages data={messages} getMessagesAcions={getMessagesAcions} />
                            )}

                            {viewActive.users && (
                                <Users data={users} GetUserActions={GetUserActions} />
                            )}
                        </div>
                    </>
                ) : history.push('/')
            }

        </React.Fragment>
    )
}

export default withRouter(AdminPage)
