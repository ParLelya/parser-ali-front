import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Navbar.module.css'

const Navbar: React.FC = () => {
	return (
		<nav className={classes.navbar + ' transparent'}>
			<div className="nav-wrapper transparent">
				<Link to="/" className="brand-logo" style={{left: '10px', top: '10px'}}>
					<img
						src="logo.png"
						alt="OLIMP logo"
						style={{height: '3em'}}
					/>
				</Link>
				<ul id="nav-mobile" className="right">
					<li>
						<Link to="/">
							Главная
						</Link>
					</li>
					<li>
						<Link to="/cabinet" className={classes.nav_to_cab}>
							Личный кабинет
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar