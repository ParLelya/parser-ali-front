import React, { useState, useEffect, useRef } from 'react'
import $api from '../http'
import { IProjectItem } from '../types/interface'
import { useNavigate, useParams } from 'react-router'


const ConcreteProject: React.FC = () => {

	const { id } = useParams()
	const redirect = useNavigate()

	const defaultItem: IProjectItem = {
		id: 0,
		title: "string",
		products: [{
			title: "string",
			parameters: "string",
			from_whom: "string",
			count: 0
		}]
	}
	const [item, setItem]: [IProjectItem, (item: IProjectItem) => void] = useState(defaultItem)


	useEffect(() => {
		$api.get<IProjectItem>(`/api/projects/${id}/`)
			.then(response => {
				const products = response.data.products
				setItem(response.data)
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

	return (
		<div className='project' ref={divRef}>
			<table className='highlight centered' style={{width: '185mm'}}>
				<thead style={{height: '15mm'}}>
					<tr>
						<th style={{width: '15mm'}}>Поз.</th>
						<th style={{width: '65mm'}}>Наименование</th>
						<th style={{width: '15mm'}}>Кол.</th>
						<th style={{width: '60mm'}}>Параметры</th>
						<th style={{width: '30mm'}}>Примечание</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{item.products?.length}</td>
						<td>{item.products[0]?.title}</td>
						<td>{item.products[0]?.count}</td>
						<td>{item.products[0]?.parameters}</td>
						<td>{item.products[0]?.from_whom}</td>
					</tr>
				</tbody>
			</table>
			<button className='btn btn-small my-btn-red' onClick={handleDelete}>Удалить проект</button>
		</div>
	)
}

export default ConcreteProject