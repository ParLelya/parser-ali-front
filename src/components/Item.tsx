import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IProductItem } from '../types/interface'
// import Carousel from './Carousel'

const Item: React.FC<IProductItem> = (props) => {

	const { id, name, images, parameters, additional_parameters } = props

	//TODO: типизироать стейт айтема
	const [item, setItem]: [IProductItem, (item: IProductItem) => void] = useState({})

	const [open, setOpen] = useState(false) //привязка к айди продукта должна быть

	//TODO: сделать отдельную страничку для конкретного продукта с подробным описанием через роутер
	useEffect(() => {
		axios.get<IProductItem>(`https://parserali.me/api/products/${id}/`)
			.then(response => {
				setItem(response.data)
			})
			.catch(error => console.log(error.message))
	})

	const openParams = () => {
		setOpen(!open)
	}

	return (
		<div className='product-item' onClick={openParams} >
			<img src={images[0]} alt='' />
			<h6>{name}</h6>
			<p>{parameters}</p>
			<iframe
				className={open ? 'visible' : ''}
				title={String(id)}
				src={additional_parameters}
				style={{ border: '0', width: '500px', height: '150px' }}
			/>
		</div>
	)
}

export default Item