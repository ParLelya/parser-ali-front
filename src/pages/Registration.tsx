import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registration } from './../slices/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';

const Registration: React.FC = () => {
	const dispatch = useAppDispatch()

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	
	const { isAuth } = useAppSelector((state: RootState) => state.auth)
	const redirect = useNavigate()

	useEffect(() => {
		if (!isAuth) {
			redirect('/cabinet')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth])

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(registration({ email, password, username }))
	}
	
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
						className='btn my-btn-blue'
						type='submit'
						onClick={handleClick}
					>Зарегистрироваться</button>
					<Link to='/cabinet' className='btn my-btn-white'>Войти</Link>
				</div>
			</form>
		</div>
	)
}

export default Registration