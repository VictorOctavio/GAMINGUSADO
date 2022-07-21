import React from 'react'
import categorias from '../../services/categorias'

//Components
import ListadoProductos from './listProductos'

//React Bootstrap
import { Spinner } from 'react-bootstrap';

const NewProducto = ({ handleGetData, handleSubmit, handleGetImage, newProducto, edit, handleEdit, loading, message_error }) => {

    return (
        <React.Fragment>
            <div className="container">
                <div className="row adminUser" style={{ marginTop: '100px' }}>

                    <div className="col-12 form-add pt-5">

                        <div className="col-10 mx-auto">
                            <h3 className="pb-2">{edit ? 'Editar Producto' : 'Agregar Producto'}</h3>
                        </div>


                        <form className="col-12 col-md-10 mx-auto" onSubmit={handleSubmit}>

                            {
                                message_error.state && (
                                    <div className="col-12 alert alert-danger" role="alert">{message_error.message}</div>
                                )
                            }

                            <div className="form-group">
                                <input name="producto" className="form-control m-0" placeholder="Producto" type="text" onChange={handleGetData} value={newProducto.producto} maxLength="50" />
                                <small className="form-text text-muted">Titulo de publicación MAX 50 caracteres (REQUERIDO)</small>
                            </div>

                            <div className="form-group">
                                <input name="precio" className="form-control m-0" placeholder="Precio" type="number" onChange={handleGetData} value={newProducto.precio} min="0" max="1000000"/>
                                <small className="form-text text-muted">Precio de Venta (REQUERIDO)</small>
                            </div>

                            <div className="form-group">
                                <input name="image" disabled={edit} multiple className="form-control m-0 p-1" type="file" onChange={handleGetImage} placeholder="CARGAR IMAGE" />
                                <small className="form-text text-muted">MAX 6 Imagenes</small>
                            </div>

                            <div className="form-group">
                                <textarea style={{ minHeight: '200px', maxHeight: '200px' }} name="descripcion" className="form-control m-0" placeholder="Descripción y Caracteristicas" onChange={handleGetData} value={newProducto.descripcion} />
                                <small className="form-text text-muted">Descripción de Venta (RECOMENDADO)</small>
                            </div>

                            <div className="form-group">
                                <select value={newProducto.categoria} name="categoria" className="form-control m-0" onChange={handleGetData}>
                                    {
                                        categorias.map((categ, i) => (
                                            <option key={i}>{categ.name}</option>
                                        ))
                                    }
                                </select>
                                <small className="form-text text-muted">Categoria Producto (RECOMENDADO)</small>
                            </div>

                            <div className="form-group">
                                <input name="email" className="form-control m-0" placeholder="Email Contacto" type="email" onChange={handleGetData} value={newProducto.email} />
                                <small className="form-text text-muted">Email Contacto (RECOMENDADO)</small>
                            </div>

                            <div className="form-group">
                                <input name="phone" className="form-control m-0" placeholder="+54 Whatsapp (Requerido)" type="text" onChange={handleGetData} value={newProducto.phone} />
                                <small className="form-text text-muted">Telefono (REQUERIDO) <b>Ejemplo: 3794235612</b></small>
                            </div>

                            {
                                !edit ? (
                                    <button className="btn btn-success btn-block my-3" disabled={loading}>{loading ? <Spinner animation="border" size="sm" /> : 'Publicar'}</button>
                                ) : (
                                    <button className="btn btn-warning btn-block my-3" disabled={loading}>{loading ? <Spinner animation="border" size="sm" /> : 'Editar'}</button>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>

            <ListadoProductos
                handleEdit={handleEdit}
            />

        </React.Fragment>
    )
}

export default NewProducto
