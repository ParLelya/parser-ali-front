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

	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(patchUserInfo({ email, password, username }))
		setOpen(false)
	}

	return (
		<div
			className={open ? 'modal_bg active' : 'modal_bg'}
			onClick={() => setOpen(false)}
		>
			<form className="my-modal" onClick={e => { e.stopPropagation() }}>
				<legend><h3>Введите новые данные</h3></legend>
				<div className="row">
					<div className="input-field col s12">
						<input
							id="username"
							type="text"
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
						onClick={handleSubmit}
					>Обновить данные</button>
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