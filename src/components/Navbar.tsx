import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
	return (
		<nav className='navbar transparent'>
			<div className="nav-wrapper transparent">
				<Link to="/" className="brand-logo" style={{left: '5px', top: '5px'}}>
					<img
						src="logo.png"
						alt="OLIMP logo"
						style={{ width: '2em'}}
					/>
				</Link>
				<ul id="nav-mobile" className="right">
					<li>
						<Link to="/cabinet" className="nav-to-cab">
							Личный кабинет
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar