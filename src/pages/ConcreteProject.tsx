import React, { useState, useEffect, useRef } from 'react'
import $api from '../http'
import { IProjectItem } from '../types/interface'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'

var fileDownload = require('js-file-download');

const ConcreteProject: React.FC = () => {

	const { id } = useParams()
	const redirect = useNavigate()

	const [projectName, setProjectName] = useState('')
	const [products, setProducts] = useState<IProjectItem["products"]>([{ id: 0, title: "", parameters: "", from_whom: "", count: 0 }])
	const [count, setCount] = useState(1)

	useEffect(() => {
		$api.get<IProjectItem>(`/api/projects/${id}/`)
			.then(response => {
				setProducts(response.data.products)
				setProjectName(response.data.title)
			})
			.catch(error => console.log(error.message))
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
				setProducts(products.filter(
					product => product.id !== id
				) as IProjectItem["products"])
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

	return (
		<div className='project' ref={divRef}>
			<h1>{projectName}</h1>
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
						products.map((obj, id: number) => {
							return (
								<tr key={obj.id}>
									<td>
										{id + 1}<br />
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
											<button className='count-btn' onClick={() => { setCount(prev => prev - 1) }}>
												<i className="material-icons">remove_circle_outline</i>
											</button>
											<span style={{ margin: 'auto .5rem' }}>{count}</span>
											<button className='count-btn' onClick={() => { setCount(prev => prev + 1) }}>
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
									<td>{obj.from_whom}</td>
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
				// href="#!"
				// download
				// target='_blank'
			>Скачать таблицу</button>
			<button className='btn btn-small my-btn-red' onClick={handleDelete}>Удалить проект</button>
		</div>
	)
}

export default ConcreteProject