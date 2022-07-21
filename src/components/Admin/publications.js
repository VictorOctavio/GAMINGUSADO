import React from 'react'
import './admin.css'
//React Bootstraps
import {ListGroup} from 'react-bootstrap'

//REDUX
import {useDispatch} from 'react-redux'
import {deleteProductoAction} from '../../redux/adminDucks';

//Redirect
import {withRouter} from 'react-router-dom'

const Publications = ({data, getProductosAction}) => {
    let productosList = null;
    const dispatch = useDispatch() //Initalization
 
    const {hasPrevPage, hasNextPage, page} = data || false;
    productosList = data.docs || null;

    const handlePagination = (e) => {
        const btn = e.target.name

        if(btn === 'next'){
            return dispatch(getProductosAction(6, page+1))
        }else{
           return dispatch(getProductosAction(6, page-1))
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <ListGroup>
                        {
                        productosList !== null && (
                            productosList.length > 0  ? (
                                productosList.map(item => (
                                    <ListGroup.Item key={item._id}>
                                        <div className="lista-productos-admin">
                                            <h6>{item.producto}</h6>
                                            <div>
                                                <a href={`/producto/${item._id}`} className="btn btn-info mx-1 btn-sm" rel="noreferrer" target="_blank">ver</a>
                                                <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteProductoAction(item._id))}>daleted</button>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))
                        ): 'CARGANDO'
                        )
                        }

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

export default withRouter(Publications)

