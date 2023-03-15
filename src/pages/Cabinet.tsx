import React, { useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import { checkAuth, openProfile } from './../slices/authSlice';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';

const Cabinet: React.FC = () => {

	const isAuth = useAppSelector((state: RootState) => state.isAuth)
	const username = useAppSelector((state: RootState) => state.user.username)
	const email = useAppSelector((state: RootState) => state.user.email)
	const id = useAppSelector((state: RootState) => state.user.id)

	// useEffect(() => {
	// 	if (localStorage.getItem('token')) {
	// 		checkAuth()
	// 		openProfile()
	// 	}
	// }, [])

	return (
		<div className='cabinet'>
			{
				isAuth
					? (
						<div className='profile'>
							<h3>Ваш профиль</h3>
							<div className='profile-info-wrapper'>
								<label className='profile-label'>Ваш id:</label>
								<span className='btn profile-info'>{id}</span>
							</div>
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