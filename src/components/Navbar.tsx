import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
	return (
		<nav className='navbar transparent'>
			<div className="nav-wrapper transparent">
				<Link to="/" className="brand-logo">
					<img
						src="https://sun9-west.userapi.com/sun9-46/s/v1/if1/z9RS1QLN4yyVvDffevmkww9bikocvmS7C8Vzsv-IAHm1DPJIWLLzTdnpA3jhwjVSOa0GAVYT.jpg?size=700x700&quality=96&type=album"
						alt="OLIMP logo"
						style={{width: '2.3em', borderRadius: '10px'}}
					/>
				</Link>
				<ul id="nav-mobile" className="right">
					<li>
						<Link to="/cabinet" className="amber-text text-darken-3">
							Личный кабинет
						</Link>
						</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar