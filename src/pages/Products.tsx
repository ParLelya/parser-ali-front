import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IProduct } from '../types/interface'
import Item from '../components/Item'
import Loader from '../components/Loader';

const Products: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true)
	const defaultItems: IProduct[] = []
	const [products, setProducts]: [IProduct[], (items: IProduct[]) => void] = useState(defaultItems)

	useEffect(() => {
		axios.get<IProduct[]>(`https://parserali.me/api/products/`)
			.then(response => {
				setProducts(response.data.results)
				setIsLoading(false)
				console.log(response.data)
				console.log(response.data.results)
				console.log(products)
			})
			.catch(error => console.log(error.message))
	}, [])

	return (
		<div className='products'>
			{
				isLoading
					? <Loader />
					: products.map((obj: IProduct) => <Item {...obj} key={obj.id} />)
			}
		</div>
	)
}

export default Products