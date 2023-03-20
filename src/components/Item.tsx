import React, {useRef} from 'react'
import $api from '../http'
import { Link } from 'react-router-dom'
import { IProduct } from '../types/interface'

const Item: React.FC<IProduct> = (props) => {

	const { id, name, images } = props
	
	const url = images.split(',')[0].replace(/\[|\]|\{|\}|\'/g, '').split(' ')[1]

	const divRef = useRef<HTMLDivElement | null>(null)

	const deleteProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		$api.delete(`/api/products/${id}/`)
		.then(() => (divRef.current?.remove()))
	}

	return (
		<div className="product-item" ref={divRef}>
			<Link 
			className="card horizontal"
			to={`/products/${id}`}
			>
				<div className="card-image">
					<img className="main-product-image" src={url} alt='' />
				</div>
				<div className="card-stacked">
					<div className="card-content">
						<h6 style={{ fontSize: '1rem' }}>{name}</h6>
					</div>
					<div className="card-action">
						<button
							className="btn btn-small my-btn-red"
							onClick={deleteProduct}
						>
							Удалить
						</button>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default Item