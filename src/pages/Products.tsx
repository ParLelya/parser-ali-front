import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IProductItem } from '../types/interface'
import Item from '../components/Item'
import Loader from '../components/Loader';

const Products: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true)
	const defaultItems: IProductItem[] = []
	const [products, setProducts]: [IProductItem[], (items: IProductItem[]) => void] = useState(defaultItems)

	useEffect(() => {
		axios.get<IProductItem[]>(`https://parserali.me/api/products/`)
			.then(response => {
				setProducts(response.data)
				setIsLoading(false)
			})
			.catch(error => console.log(error.message))
	}, [])

	return (
		<div className='products'>
			{
				isLoading
				? <Loader/>
				: products.map((obj: IProductItem) => <Item {...obj} key={obj.id} />)
			}
		</div>
	)
}

export default Products