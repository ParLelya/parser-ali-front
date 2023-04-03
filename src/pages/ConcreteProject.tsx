import React, { useState, useEffect, useRef } from 'react'
import $api from '../http'
import { IProjectItem } from '../types/interface'
import { useNavigate, useParams } from 'react-router'

const ConcreteProject: React.FC = () => {

	const { id } = useParams()
	const redirect = useNavigate()

	const [products, setProducts] = useState<IProjectItem["products"]>([{ title: "", parameters: "", from_whom: "", count: 0 }])

	useEffect(() => {
		$api.get<IProjectItem>(`/api/projects/${id}/`)
			.then(response => {
				setProducts(response.data.products)
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

	const rowRef = useRef<HTMLTableRowElement | null>(null)
	const deleteProduct = (id: number) => {
		$api.delete(`/api/product_project/${id + 1}/`)
			.then(() => (rowRef.current?.remove()))
			.catch(error => console.error(error.message))
	}

	const downloadCSV = () => {
		
	}

	return (
		<div className='project' ref={divRef}>
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
								<tr key={id} ref={rowRef}>
									<td>
										{id + 1}<br />
										<button
											className='btn my-btn-red'
											onClick={() => deleteProduct(id)}
											style={{ fontSize: '.8rem', width: '50%' }}
										>
											<i className="material-icons" style={{ transform: 'translateX(-10%)' }}>delete</i>
										</button>
									</td>
									<td>{obj.title}</td>
									<td style={{ height: '100%', margin: 'auto 0' }}>
										<div style={{display: 'flex', justifyContent: 'space-between'}}>
											<button className='count-btn' onClick={() => { obj.count-- }}>
												<i className="material-icons">remove_circle_outline</i>
											</button>
											<span style={{ margin: 'auto .5rem' }}>{obj.count}</span>
											<button className='count-btn' onClick={() => { obj.count++ }}>
												<i className="material-icons">add_circle_outline</i>
											</button>
										</div>
									</td>
									<td>{obj.parameters}</td>
									<td>{obj.from_whom}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
			<button className='btn btn-small my-btn-blue' onClick={downloadCSV}>Скачать таблицу</button>
			<button className='btn btn-small my-btn-red' onClick={handleDelete}>Удалить проект</button>
		</div>
	)
}

export default ConcreteProject