import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registrationAsync } from './../slices/authSlice';

const Registration: React.FC = () => {
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

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
							value={username}
							onChange={e => setUsername(e.target.value)}
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
							value={email}
							onChange={e => setEmail(e.target.value)}
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
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<label htmlFor="password">Введите пароль</label>
					</div>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
					<button
						className='btn'
						style={{ backgroundColor: "#351BA9", width: '15rem', borderRadius: '6px' }}
						onClick={() => registrationAsync({ email, password, username })}
					>Зарегистрироваться</button>
					<Link to='/cabinet' className='btn' style={{ backgroundColor: "#fff", color: '#351BA9', width: '15rem', borderRadius: '6px', border: '2px solid #351BA9' }}>Войти</Link>
				</div>
			</form>
		</div>
	)
}

export default Registration