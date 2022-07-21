import React, { useRef } from 'react'
import './navbar.css'

import { withRouter } from 'react-router-dom'

//React Icons
import { BiSearch, BiBookmark } from 'react-icons/bi';
import { RiAccountCircleFill } from 'react-icons/ri';
import { MdPersonOutline } from 'react-icons/md';
import { CgLogOut } from 'react-icons/cg';
import { DiGhostSmall } from 'react-icons/di';

//React Bootstrap
import { Navbar, NavDropdown, Nav, Form, FormControl, Dropdown, Button } from 'react-bootstrap';

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../../redux/userDuck';
import { getCategoriaProductos } from '../../redux/appDuck';

//uri
import Config from '../../config';

//Categorias
import Categorias from '../../services/categorias';

const img = 'https://res.cloudinary.com/dyntggmrp/image/upload/v1631732558/usadoGamer/white_yyzdtt.png';

const NavbarComponent = (props) => {

	//States
	const [search, setSearch] = React.useState(localStorage.getItem('search') || '');

	//REDUX
	const dispatch = useDispatch()
	const token = useSelector(store => store.user.token)
	const activeAdmin = useSelector(store => store.administrador.admin) //admin access

	//REDIRECT LOGIN
	const handleLogin = () => {
		props.history.push('/ingresar')
	}

	//CERRAR SESSION
	const handleLogout = () => {
		dispatch(logoutUserAction())
		window.location.href = `${Config.URL}/ingresar`;
	}

	//REDIRECT A MI CUENTA
	const handleMicuenta = () => {
		props.history.push(`/micuenta`)
	}

	//REDIRECT CATEGORY PRODUCT
	const handleCategory = (category) => {

		props.history.push(`/productos/${category}`);
		dispatch(getCategoriaProductos());
	}

	//SEARCH Y REDIRECT PRODUCTOS
	const handleSearch = e => {
		e.preventDefault();

		if (!search.trim()) return console.log('ingresa algo');
		localStorage.setItem('search', search);

		props.history.replace(`/productos/${search}`);
		window.location.reload();;
	}

	//REDIRECT MIS GUARDADOS
	const handleGuardados = e => {
		props.history.push(`/guardados`)
	}

	//
	let navbarDiv = useRef(null);
	const urlActual = window.location.href === Config.URL + '/';
	const navbarColor = () => {
		window.onscroll = () => {
			if (urlActual) {
				if (window.scrollY < 650) {
					navbarDiv.classList.add("navbar-opacity");
				} else {
					navbarDiv.classList.remove("navbar-opacity");
				}
			}
		}
	}

	navbarColor();

	return (
		<header>
			<Navbar className={urlActual ? "navegation navbar-opacity" : "navegation"} ref={el => { navbarDiv = el }} variant="dark" expand="md" fixed="top">
				<div className="container">
					<Navbar.Brand><a href={`${Config.URL}`} className="logo-icon"><img className="img-logo-gu" src={img} alt="gaming" /> GU</a></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Navbar.Collapse id="basic-navbar-nav">

						<Form inline onSubmit={handleSearch} className="form-search">
							<FormControl type="search" className="mr-sm-2" placeholder="Buscar" onChange={e => setSearch(e.target.value)} value={search} />
							<Button variant="light" type="submit"><BiSearch /></Button>
						</Form>

						<Nav className="navegacion-derecha">
							<NavDropdown title={<b>Productos</b>} id="collasible-nav-dropdown">

							
								<NavDropdown.Item name="all" onClick={() => handleCategory('all')}><DiGhostSmall /> Todos</NavDropdown.Item>
							
								<NavDropdown.Divider />
								{
									Categorias.map(item => (
										<NavDropdown.Item key={item.name} name={item.name} onClick={() => handleCategory(item.name)}>{item.icon} {item.name}</NavDropdown.Item>
									))
								}
							</NavDropdown>

							{
								token !== null ? (
									<NavDropdown className="mi-cuenta" variant="inherit" title={<RiAccountCircleFill className="mi-cuenta-svg" />}>
										<Dropdown.Item onClick={handleMicuenta}>
											<MdPersonOutline className="mr-1" style={{ fontSize: '17px' }} />Mi Cuenta
										</Dropdown.Item>

										<Dropdown.Item onClick={handleGuardados}>
											<BiBookmark className="mr-1" style={{ fontSize: '16px' }} />Guardados
										</Dropdown.Item>
										{
											activeAdmin && (
												<Dropdown.Item onClick={() => props.history.push('/admin')}>Admin</Dropdown.Item>
											)
										}
										<Dropdown.Item onClick={handleLogout}>
											<CgLogOut style={{ fontSize: '16px' }} /> Salir
										</Dropdown.Item>
									</NavDropdown>
								) : (
									<button className="btn ir-login" style={{ color: '#fff', fontWeight: 300 }} onClick={handleLogin}>Empezar a vender</button>
								)
							}

						</Nav>

					</Navbar.Collapse>

				</div>

				<div className="lineaAmarilla"></div>
				<div className="lineaBlue"></div>
			</Navbar>
		</header>

	)
}

export default withRouter(NavbarComponent)