import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginAsync } from '../slices/authSlice'

const AuthForm: React.FC = () => {

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		loginAsync({ email, password })
	}

	return (
		<div className="auth-form">
			<h1>Добро пожаловать!</h1>
			<p style={{ color: 'black' }}>Пожалуйста, войдите в свой профиль.</p>
			<form>
				<div className="row">
					<div className="input-field col s12">
						<input
							id="email"
							type="email"
							value={email}
							className="validate"
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
							value={password}
							className="validate"
							onChange={e => setPassword(e.target.value)}
						/>
						<label htmlFor="password">Введите пароль</label>
					</div>
				</div>
				<button
					type='submit'
					className='btn'
					style={{ backgroundColor: "#351BA9", width: '15rem', borderRadius: '6px' }}
					onClick={handleClick}
				>Войти</button>
			</form>
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
				<p style={{ color: 'black', padding: '1rem' }}>Впервые в ОЛИМП?</p>
				<Link
					to='/registration'
					style={{ padding: '1rem', margin: '1rem 0' }}
				>Зарегистрироваться</Link>
			</div>
		</div>
	)
}

export default AuthForm