import React, { useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import Loader from '../components/Loader';
import { checkAuth, fetchUserInfo } from './../slices/authSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store/store';

const Cabinet: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isLoading, isAuth, username, email, id } = useAppSelector((state: RootState) => state.auth)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth())
			dispatch(fetchUserInfo())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	// isLoading
	// ? <Loader />
	// : 

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