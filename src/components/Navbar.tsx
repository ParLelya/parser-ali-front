import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
	return (
		<nav>
			<div className="nav-wrapper transparent">
				{/* <a href="#" className="brand-logo">Logo</a> */}
				<ul id="nav-mobile" className="right">
					<li><Link to="/cabinet">Личный кабинет</Link></li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar