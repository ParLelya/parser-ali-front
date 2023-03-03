import React from 'react'

const Footer = () => {
	return (

		<footer className="page-footer transparent">
			<div className="container">
				<div className="row">
					<div className="col m6 s12">
						<h5 className="brown-text">Footer Content</h5>
						<p className="brown-text text-darken-3">Sample text.</p>
					</div>
					<div className="col m6 s12">
						<h5 className="brown-text">Links</h5>
						<ul>
							<li><a className="amber-text text-darken-3" href="#!">Link 1</a></li>
							<li><a className="amber-text text-darken-3" href="#!">Link 2</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-copyright" style={{ borderRadius: '0 0 30px 30px', alignItems: 'center' }}>
				<div className="container">
					<p className="brown-text text-darken-3">© 2023 Copyright Text</p>
				</div>
			</div>
		</footer>

	)
}

export default Footer