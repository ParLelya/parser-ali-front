import React, { useEffect, useRef } from 'react'
import $api from '../../http'
import { parameters } from '../../types/interface'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	getProducts,
	minusCount,
	plusCount,
	removeProduct,
	updateProductCount
} from '../../slices/productSlice'
import { RootState } from '../../store/store'
import Loader from '../../components/Loader'

var fileDownload = require('js-file-download');

export type Product = {
	id: number;
	title: string;
	parameters: string | parameters | parameters[];
	count: number;
	from_whom: string;
	price: string;
}

const ConcreteProject: React.FC = () => {

	const { id } = useParams()
	const redirect = useNavigate()
	const dispatch = useAppDispatch()
	const { projectTitle, products, isLoading } = useAppSelector((state: RootState) => state.products)

	useEffect(() => {
		dispatch(getProducts(Number(id)))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const divRef = useRef<HTMLDivElement | null>(null)
	const handleDelete = () => {
		$api.delete(`/api/projects/${id}/`)
			.then(() => (divRef.current?.remove()))
		redirect('/projects')
	}

	const deleteProduct = (id: number) => {
		$api.delete(`/api/product_project/${id}/`)
			.then(() => {
				dispatch(removeProduct(id))
			})
			.catch(error => console.error(error.message))
	}

	const downloadCSV = () => {
		$api.get(`https://parserali.me/api/csv/${id}/`)
			.then(response => {
				fileDownload(response.data, 'data.csv');
			})
			.catch(error => console.error(error.message))
	}

	if (isLoading) return <Loader />

	return (
		<div className='project' ref={divRef}>
			<h1>{projectTitle}</h1>
			<table className='highlight centered' style={{ width: '100%' }}>
				<thead style={{ height: '15mm' }}>
					<tr>
						<th style={{ width: '10%' }}>Поз.</th>
						<th style={{ width: '30%' }}>Наименование</th>
						<th style={{ width: '10%' }}>Кол.</th>
						<th style={{ width: '35%' }}>Параметры</th>
						<th style={{ width: '15%' }}>Примечание</th>
					</tr>
				</thead>
				<tbody>
					{
						products.map((obj: Product, index: number) => {
							return (
								<tr key={obj.id}>
									<td>
										{index + 1}<br />
										<button
											className='btn my-btn-red'
											onClick={() => deleteProduct(obj.id)}
											style={{
												fontSize: '.8rem',
												width: '50%',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												margin: '0 auto'
											}}
										>
											<i className="material-icons">delete</i>
										</button>
									</td>
									<td>{obj.title}</td>
									<td style={{ height: '100%', margin: 'auto 0' }}>
										<div style={{ display: 'flex', justifyContent: 'space-between' }}>
											<button className='count-btn' onClick={() => {
												dispatch(minusCount(obj.id))
												dispatch(updateProductCount({ id: obj.id, count: obj.count - 1 }))
											}}>
												<i className="material-icons">remove_circle_outline</i>
											</button>
											<span style={{ margin: 'auto .5rem' }}>{obj.count}</span>
											<button className='count-btn' onClick={() => {
												dispatch(plusCount(obj.id))
												dispatch(updateProductCount({ id: obj.id, count: obj.count + 1 }))
											}}>
												<i className="material-icons">add_circle_outline</i>
											</button>
										</div>
									</td>
									<td style={{ whiteSpace: 'pre-wrap' }}>
										{
											JSON.stringify(obj.parameters)
												.replace(/\\|"|'|\{|\}|\[|\]|:|,/g, '')
												.replace('title', '')
												.replaceAll('title', `\n`)
												.replaceAll('info', ':')
												.replaceAll('name', ' ')
										}
									</td>
									<td>{`${obj.from_whom},\n ${obj.price}`}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
			<Link to='/projects' className='btn btn-small my-btn-white' style={{ width: '20rem' }}>Вернуться к списку проектов</Link>
			<button
				className='btn btn-small my-btn-blue'
				onClick={downloadCSV}
			>Скачать таблицу</button>
			<button className='btn btn-small my-btn-red' onClick={handleDelete}>Удалить проект</button>
		</div>
	)
}

export default ConcreteProject