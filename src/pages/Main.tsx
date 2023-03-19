import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { RootState } from '../store/store'


const Main: React.FC = () => {
	const { isAuth } = useAppSelector((state: RootState) => state.auth)
	const redirect = useNavigate()

	useEffect(() => {
		if (!isAuth) {
			redirect('/cabinet')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth])

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