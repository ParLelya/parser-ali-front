import React from 'react'
import { Link } from 'react-router-dom'
import { IProductItem } from '../types/interface'
// import Carousel from './Carousel'

const Item: React.FC<IProductItem> = (props) => {

	const { id, name, images } = props
	const url = images.split(',')[0].replace(/\[|\]|\{|\}|\'/g, '').split(' ')[1]

	return (
		<Link
			className="product-item"
			to={`/products/${id}`}
		>
			<div className="card horizontal ">
				<div className="card-image">
					<img className="main-product-image" src={url} alt='' />
				</div>
				<div className="card-stacked">
					<div className="card-content">
						<h6 className="amber-text text-darken-3">{name}</h6>
					</div>
					{/* <div className="card-action">
							<a href="#">This is a link</a>
						</div> */}
				</div>
			</div>
		</Link>
	)
}

export default Item