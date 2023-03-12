import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IProduct } from '../types/interface'
// import Carousel from './Carousel'

const Item: React.FC<IProduct> = (props) => {

	const { id, name, images } = props
	const url = images.split(',')[0].replace(/\[|\]|\{|\}|\'/g, '').split(' ')[1]

	const deleteProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		axios.delete(`https://parserali.me/api/products/${id}/`)
			.then()
	}

	return (
		<Link
			className="product-item"
			to={`/products/${id}`}
		>
			<div className="card horizontal">
				<div className="card-image">
					<img className="main-product-image" src={url} alt='' />
				</div>
				<div className="card-stacked">
					<div className="card-content">
						<h6 style={{ fontSize: '1rem' }}>{name}</h6>
					</div>
					<div className="card-action">
						<button
							className="btn-flat btn-small waves-effect"
							onClick={deleteProduct}
						>
							Удалить <i className="material-icons right">close</i>
						</button>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default Item