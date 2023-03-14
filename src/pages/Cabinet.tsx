import React, { useState } from 'react'
import AuthForm from '../components/AuthForm'

const Cabinet: React.FC = () => {
	//TODO: сделать состояние isAuth, по которому отображается содержимое страницы (вход или авторизованный профиль)
	return (
		<div className='cabinet'>
			<AuthForm />
		</div>
	)
}

export default Cabinet