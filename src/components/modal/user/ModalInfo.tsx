import React, { useState } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { patchUserInfo } from '../../../slices/authSlice'
import '../Modal.css'

interface IModalProps {
	open: boolean
	setOpen: (open: boolean) => void
	children?: React.ReactNode
}

const ModalInfo: React.FC<IModalProps> = ({ open, setOpen }) => {
	const dispatch = useAppDispatch()

	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	function patchUsername(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		event.preventDefault()
		dispatch(patchUserInfo({ username }))
		setOpen(false)
	}

	function patchEmail(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		event.preventDefault()
		dispatch(patchUserInfo({ email }))
		setOpen(false)
	}

	function patchPassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		event.preventDefault()
		dispatch(patchUserInfo({ password }))
		setOpen(false)
	}

	return (
		<div
			className={open ? 'modal_bg active' : 'modal_bg'}
			onClick={() => setOpen(false)}
		>
			<form
				className="my-modal"
				onClick={e => { e.stopPropagation() }}
			>
				<legend><h5>Введите новые данные</h5></legend>
				<div className="row">
					<div className="input-field">
						<input
							id="username"
							type="text"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
						<label htmlFor="username">Введите имя пользователя</label>
						<button
							className='btn my-btn-blue'
							onClick={patchUsername}
						>Обновить имя пользователя
						</button>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<input
							id="email"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<label htmlFor="email">Введите email</label>
						<button
							className='btn my-btn-blue'
							onClick={patchEmail}
						>Обновить емейл
						</button>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<input
							id="password"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<label htmlFor="password">Введите пароль</label>
						<button
							className='btn my-btn-blue'
							onClick={patchPassword}
						>Обновить пароль
						</button>
					</div>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button
						className='btn my-btn-white'
						type='reset'
						onClick={() => setOpen(false)}
					>Закрыть окно</button>
				</div>
			</form>
		</div>
	)
}

export default ModalInfo