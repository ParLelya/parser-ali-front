import React from 'react'
import { Link, redirect, Location } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { RootState } from '../store/store'

const Main: React.FC = () => {

	const { isAuth } = useAppSelector((state: RootState) => state.auth.isAuth)

	if (!isAuth) {
		redirect('/cabinet')
	}

	return (
		<div className="collection menu" style={{ width: '100%' }}>
			<Link
				to="/parse"
				className="collection-item transparent"
				style={{ margin: '1rem 0', paddingBottom: '2rem' }}
			>
				Парсинг
			</Link>
			<Link
				to="/products"
				className="collection-item transparent"
				style={{ margin: '1rem 0' }}
			>
				Мои продукты
			</Link>
		</div>
	)
}

export default Main