import React from 'react'
import './admin.css'
//React Bootstraps
import {Accordion, Card, ListGroup} from 'react-bootstrap'

//REDUX
import {useDispatch} from 'react-redux'

const Messages = ({data, getMessagesAcions}) => {
    
    const dispatch = useDispatch()//INITALIZATION DISPTACH

    const messages = data.docs || null;
    const {hasPrevPage, hasNextPage, page} = data || false;

    const handlePagination = (e) => {
            const btn = e.target.name

            if(btn === 'next'){
                return dispatch(getMessagesAcions(3, page+1))
            }else{
            return dispatch(getMessagesAcions(3, page-1))
            }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                <Accordion defaultActiveKey="0"> 
                    {
                        messages !== null && (
                            messages.length > 0 ? (
                                messages.map((item, index) => (
                                    <Card key={item._id}>
                                        
                                        <Card.Header>
                                            <Accordion.Toggle className="btn text-info" eventKey={index+1}>              
                                             {item.email} - <strong>{item.name}</strong>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                     

                                      <Accordion.Collapse eventKey={index+1}>
                                        <Card.Body>{item.message}</Card.Body>
                                      </Accordion.Collapse>

                                    </Card>
                            ))
                            ): 'NO HAY MESSAGES NUEVOS'
                        )
                    }
                </Accordion>

                <ListGroup>
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

export default Messages
