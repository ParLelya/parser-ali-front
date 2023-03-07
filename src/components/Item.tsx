import React from 'react'
import { Link } from 'react-router-dom'
import { IProductItem } from '../types/interface'
// import Carousel from './Carousel'

const Item: React.FC<IProductItem> = (props) => {

	const { id, name, images } = props
	//TODO: компонент не отрисовывается, но ссылка обновляется, надо думать как фиксить
	return (
		<Link
			className="product-item"
			to={`/products/${id}`}
		>
			{/* TODO: доставать первую картинку из массива */}
			<img src={images} alt='' />
			<h6 className="amber-text text-darken-3">{name}</h6>
		</Link>
	)
}

export default Item