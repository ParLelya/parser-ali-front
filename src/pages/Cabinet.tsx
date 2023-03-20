import React, { useState, useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import Loader from '../components/Loader';
import { /*cookies, refreshToken,*/ fetchUserInfo, setIsAuth } from './../slices/authSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store/store';
import ModalInfo from '../components/modal/user/ModalInfo';

const Cabinet: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isLoading, isAuth, user } = useAppSelector((state: RootState) => state.auth)
	const [open, setOpen] = useState<boolean>(false)

	const handleClick = () => {
		localStorage.removeItem('token')
		dispatch(setIsAuth(false))
	}

	const patchInfo = () => {
		setOpen(true)
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(fetchUserInfo())
			// dispatch(refreshToken(cookies.get('token')))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (isLoading) return <Loader />

	return (
		<div className='cabinet'>
			{
				isAuth
					? (
						<>
							<div className='profile'>
								<h3>Ваш профиль</h3>
								<div className='profile-info-wrapper'>
									<label className='profile-label'>Имя пользователя:</label>
									<span className='btn profile-info'>{user.username}</span>
								</div>
								<div className='profile-info-wrapper'>
									<label className='profile-label'>Ваш емейл:</label>
									<span className='btn profile-info'>{user.email}</span>
								</div>
								<button
									className='btn my-btn-blue'
									onClick={patchInfo}
								>Изменить данные</button>
								<button
									className='btn my-btn-white'
									onClick={handleClick}
								>Выйти</button>
							</div>
							<ModalInfo open={open} setOpen={setOpen} ></ModalInfo>
						</>
					)
					: <AuthForm />
			}
		</div>
	)
}

export default Cabinet