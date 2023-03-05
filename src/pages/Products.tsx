import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IProductItem } from '../types/interface'
import Loader from '../components/Loader'
import Item from '../components/Item'

const Products: React.FC = () => {

	const productsBaseUrl: string = ''
	const [isLoading, setIsLoading] = useState(true)
	//TODO: типизировать стейт продукта с интерфейсом IProductItem
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios.get<IProductItem>(`${productsBaseUrl}/products`)
		.then(response => {
			//TODO: подгружать дату в компоненту Item
			console.log(response.data)
			setIsLoading(false)
		})
		.catch(error => console.log(error.message))
	}, [])

	return (
		<div className='products'>
			{
				isLoading
				? <Loader/>
				: <Item/>
			}
			{/* TODO: итерация по массиву продуктов 
			products.map() вместо одной компоненты*/}
		</div>
	)
}

export default Products