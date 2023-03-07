import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { IProductItem } from '../types/interface'
// import Carousel from './Carousel'

const Item: React.FC<IProductItem> = (props) => {

	const { id, name, images } = props
	// const router = useNavigate()

	return (
		<Link
			className="product-item"
			to={`/products/${id}`}
		>
			<img src={images} alt='' />
			<h6 className="amber-text text-darken-3">{name}</h6>
		</Link>
	)
}

export default Item