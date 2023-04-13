import React, { useState, useEffect } from 'react';
import $api from '../http';
import { useInView } from 'react-intersection-observer';
import { IProduct } from '../types/interface'
import Item from '../components/Item'
import Loader from '../components/Loader';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';

const Products: React.FC = () => {

	const { isAuth } = useAppSelector((state: RootState) => state.auth)
	const redirect = useNavigate()

	useEffect(() => {
		if (!isAuth) {
			redirect('/cabinet')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth])

	const [isLoading, setIsLoading] = useState(true)
	const defaultItems: IProduct[] = [{ id: 0, name: '', images: '' }]
	const [products, setProducts] = useState<IProduct[]>(defaultItems)
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const getPagesCount = (totalCount: number, limit: number) => {
		return Math.ceil(totalCount / limit);
	}

	const fetchProducts = () => {
		$api.get(`/api/products/?limits=${limit}&page=${page}`)
		.then(response => {
			setProducts(response.data.results)
			setIsLoading(false)
			const totalCount: number = response.data.count
			setTotalPages(getPagesCount(totalCount, limit))
		})
		.catch(error => console.error(error.message))
	}

	useEffect(() => {
		fetchProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const { ref } = useInView({
		threshold: 1,
		onChange(inView) {
			if (inView) {
				setPage(prev => prev + 1)
				if (page >= 2 && page <= totalPages) {
					$api.get(`/api/products/?limits=${limit}&page=${page}`)
						.then(response => {
							setProducts([...products, ...response.data.results])
						})
				}
			}
		}
	})

	if (!products.length) {
		return <h3 style={{ color: 'black', textShadow: '0px 2px 4px white' }}>Список продуктов пуст :(</h3>
	}

	return (
		<>
			<h1>Мои продукты</h1>
			<div className='products'>
				{
					isLoading
						? <Loader />
						: products.map((obj: IProduct) => <Item {...obj} key={obj.id} />)
				}
				<div ref={ref} style={{ width: '100%', height: '1rem' }}></div>
			</div>
		</>
	)
}

export default Products