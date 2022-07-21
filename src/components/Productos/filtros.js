import React from 'react'
import './productos.css'

//React Bootstrap´
import {Dropdown} from 'react-bootstrap'
import {RiFilter3Line} from 'react-icons/ri'

//REDUX
import {useDispatch} from 'react-redux'
import {getCategoriaProductos, getFiltrosPrcio} from '../../redux/appDuck'

const Filtros = () => {
    
    //Dispatch
    const dispatch = useDispatch()

    //States
    const [filterPrecio, setFilterPrecio] = React.useState({min: 0, max: 10000})

    const handleFilter = (e) => {
        const sort = e.target.name;
        dispatch(getCategoriaProductos(sort));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getFiltrosPrcio(filterPrecio));
    }

    return (
       <section className="mt-5 filer-section">
               
        <form onSubmit={handleSubmit}>
            <input className="form-control" type="number" placeholder="min" onChange={(e) => setFilterPrecio({...filterPrecio, min: e.target.value})} />
            <input className="form-control mx-2" type="number"  placeholder="max" onChange={(e) => setFilterPrecio({...filterPrecio, max: e.target.value})}/>
            <button className="btn btn-primary" type="submit"><RiFilter3Line/></button>
        </form>
         
    
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">Filtros</Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item name="-createdAt" onClick={handleFilter}>Más recientes</Dropdown.Item>
                <Dropdown.Item name="precio" onClick={handleFilter}>Menor a mayor precio</Dropdown.Item>
                <Dropdown.Item name="-precio" onClick={handleFilter}>Mayor a menor precio</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    
       </section>
    )
}

export default Filtros
