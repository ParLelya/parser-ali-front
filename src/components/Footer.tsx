import React from 'react'

const Footer: React.FC = () => {
	return (

		<footer className="page-footer transparent">
			<div className="container">
				<div className="row">
					<div className="col m6 s12">
						{/* <h5>Footer Content</h5> */}
						<p>From OLIMP with love</p>
					</div>
					<div className="col m6 s12">
						<h5>Links</h5>
						<ul>
							<li><a href="#!">Link 1</a></li>
							<li><a href="#!">Link 2</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-copyright" style={{ borderRadius: '0 0 30px 30px', alignItems: 'center', color: '#351BA9' }}>
				<div className="container">
					<p style={{color: '#C81818'}}>© 2023 Copyright Text</p>
				</div>
			</div>
		</footer>

	)
}

export default Footer