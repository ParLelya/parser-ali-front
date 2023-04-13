import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { cookies, refreshToken, login } from '../slices/authSlice'
import { useAppDispatch } from '../store/hooks';

const AuthForm: React.FC = () => {
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {	
		event.preventDefault()
		dispatch(login({ email, password }))
		dispatch(refreshToken(cookies.get('token')))
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