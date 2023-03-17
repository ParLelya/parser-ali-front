import React, { useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import Loader from '../components/Loader';
import { cookies, refreshToken, fetchUserInfo } from './../slices/authSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store/store';

const Cabinet: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isLoading, isAuth, username, email } = useAppSelector((state: RootState) => state.auth)
	console.log(isLoading, isAuth, username, email)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(refreshToken(cookies.get('token')))
			dispatch(fetchUserInfo())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (isLoading) return <Loader />

	return (
		<div className='cabinet'>
			{
				isAuth
					? (
						<div className='profile'>
							<h3>Ваш профиль</h3>
							<div className='profile-info-wrapper'>
								<label className='profile-label'>Имя пользователя:</label>
								<span className='btn profile-info'>{username}</span>
							</div>
							<div className='profile-info-wrapper'>
								<label className='profile-label'>Ваш емейл:</label>
								<span className='btn profile-info'>{email}</span>
							</div>
						</div>
					)
					: <AuthForm />
			}
		</div>
	)
}

export default Cabinet