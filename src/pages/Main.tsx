import React from 'react'
import { Link } from 'react-router-dom'

const Main: React.FC = () => {
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