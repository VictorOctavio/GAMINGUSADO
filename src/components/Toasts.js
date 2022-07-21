import React from 'react';
import './spiner.css';


import {Row, Col, Toast} from 'react-bootstrap';

//REDUX
import {useSelector} from 'react-redux'

const avatar = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1615378019/gamer_1_njghgv.png'

const Toasts = () => {

    const active = useSelector(store => store.app.message || store.admin.message);

    if(active.state){
        setTimeout(() => {
            active.state = false;
        }, 3000)
    }

    return (
        <div style={{position: 'fixed', top: '12%', right: 0 , zIndex: 3}}>
            <Row>
                <Col>
                    <Toast style={{minWidth: '250px'}} animation={false} show={active.state} delay={3000} autohide>
                        <Toast.Header>
                            <img src={avatar} width="50px" alt="gamingMessage"/>
                            <strong className="mr-auto mx-1">{active.title || 'UPS'} </strong>
                        </Toast.Header>
                        <Toast.Body>{active.message || 'ALGO SALIO MAL'}</Toast.Body>
                    </Toast>
                </Col>
            </Row>          
        </div>
    )
}

export default Toasts
