import React, { useState } from 'react'
import $api from '../http'

const ModalInfo: React.FC = () => {

	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	
	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		$api.patch()
	}

	return (
		<div className='modal-bg'>
			<form className="modal">
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
				</div>
			</form>
		</div>
	)
}

export default ModalInfo