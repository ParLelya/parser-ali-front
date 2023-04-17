import React from 'react'

const Footer: React.FC = () => {
	return (
		<footer className='footer page-footer transparent'>
			<div className="container" style={{ margin: '0' }}>
				<div className="row">
					<div className="col m6 s12">
						<h5>From OLIMP</h5>
						<p>with love</p>
					</div>
					<div className="col m6 s12">
						<h5>Ссылки</h5>
						<ul>
							{/* eslint-disable-next-line react/jsx-no-target-blank */}
							<li><a href="https://github.com/ParLelya/parser-ali-front" target='_blank'>Github frontend</a></li>
							{/* eslint-disable-next-line react/jsx-no-target-blank */}
							<li><a href="https://github.com/Cirilus/ParserAli" target='_blank'>Github backend</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-copyright" style={{ borderRadius: '0 0 30px 30px', alignItems: 'center', color: '#351BA9' }}>
				<div className="container">
					<p style={{ color: '#000' }}>© 2023 OLIMP Union</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer