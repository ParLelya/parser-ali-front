import React, { useState } from 'react'

const AuthForm: React.FC = () => {

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	return (
		<div className="auth-form">
			<form className="col s12">
				<div className="row">
					<div className="input-field col s12">
						<input
							id="email"
							type="email"
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
							className="validate"
							onChange={e => setPassword(e.target.value)}
						/>
						<label htmlFor="password">Введите пароль</label>
					</div>
				</div>
			</form>
		</div>
	)
}

export default AuthForm