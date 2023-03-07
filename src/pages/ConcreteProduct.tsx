import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { IProductItem } from '../types/interface';

const ConcreteProduct: React.FC = () => {

	const { id } = useParams()
	const [item, setItem]: [IProductItem, (item: IProductItem) => void] = useState({ id: 0, name: '', images: '' })

	useEffect(() => {
		axios.get<IProductItem>(`https://parserali.me/api/products/${id}/`)
			.then(response => {
				setItem(response.data)
			})
			.catch(error => console.log(error.message))
	})

	return (
		<div className='product-item'>
			<img src={item.images[0]} alt='' />
			<div>
				<h6 className="brown-text text-darken-4">{item.name}</h6>
				<p className="brown-text text-darken-2">{item.parameters}</p>
			</div>
			<iframe
			className="brown-text text-darken-3"
				title={item.unique_id}
				srcDoc={item.additional_parameters}
				style={{ border: '0', width: '500px', height: '150px' }}
			/>
		</div>
	)
}

export default ConcreteProduct