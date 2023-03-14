import React from 'react'

const Registration: React.FC = () => {
	return (
		<div className="auth-form">
			<h1>Регистрация</h1>
			<p style={{ color: 'black' }}>Пожалуйста, введите свои данные.</p>
			<form className="">
				<div className="row">
					<div className="input-field col s12">
						<input
							id="username"
							type="text"
							className="validate"
						/>
						<label htmlFor="username">Введите имя пользователя</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<input
							id="email"
							type="email"
							className="validate"
						/>
						<label htmlFor="email">Введите email</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<input
							id="password"
							type="password"
							className="validate"
						/>
						<label htmlFor="password">Введите пароль</label>
					</div>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
					<button className='btn' style={{ backgroundColor: "#351BA9", width: '15rem', borderRadius: '6px' }}>Зарегистрироваться</button>
					<Link to='/cabinet' className='btn' style={{ backgroundColor: "#fff", color: '#351BA9', width: '15rem', borderRadius: '6px', border: '2px solid #351BA9' }}>Войти</Link>
				</div>
			</form>
		</div>
	)
}

export default Registration