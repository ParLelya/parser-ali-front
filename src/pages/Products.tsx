import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IProductItem } from '../types/interface'
import Loader from '../components/Loader'
import Item from '../components/Item'

const Products: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true)
	const defaultItems: IProductItem[] = []
	const [products, setProducts]: [IProductItem[], (items: IProductItem[]) => void] = useState(defaultItems)

	useEffect(() => {
		axios.get<IProductItem[]>(`https://parserali.me/api/products`)
			.then(response => {
				setProducts(response.data)
				setIsLoading(false)
			})
			.catch(error => console.log(error.message))
	}, [])

	const items: JSX.Element[] = products.map((obj: IProductItem) => <Item {...obj} key={obj.id} />)
	
	return (
		<div className='products'>
			{
				isLoading
					? <Loader />
					: items
			}
		</div>
	)
}

export default Products