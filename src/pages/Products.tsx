import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../http';
import { useInView } from 'react-intersection-observer';
import { IProduct } from '../types/interface'
import Item from '../components/Item'
import Loader from '../components/Loader';

const Products: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true)
	const defaultItems: IProduct[] = [{ id: 0, name: '', images: '' }]
	const [products, setProducts]: [IProduct[], (items: IProduct[]) => void] = useState(defaultItems)
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const getPagesCount = (totalCount: number, limit: number) => {
		return Math.ceil(totalCount / limit);
	}

	useEffect(() => {
		axios.get(`${API_URL}/products/?limits=${limit}&page=${page}`)
			.then(response => {
				setProducts(response.data.results)
				setIsLoading(false)
				const totalCount: number = response.data.count
				setTotalPages(getPagesCount(totalCount, limit))
			})
			.catch(error => console.error(error.message))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const { ref } = useInView({
		threshold: 1,
		onChange(inView) {
			if (inView) {
				setPage(prev => prev + 1)
				if (page >= 2 && page <= totalPages) {
					axios.get(`${API_URL}/products/?limits=${limit}&page=${page}`)
						.then(response => {
							setProducts([...products, ...response.data.results])
						})
				}
			}
		}
	})

	return (
		<div className='products'>
			{
				isLoading
					? <Loader />
					: products.map((obj: IProduct) => <Item {...obj} key={obj.id} />)
			}
			<div ref={ref} style={{ width: '100%', height: '1rem' }}></div>
		</div>
	)
}

export default Products