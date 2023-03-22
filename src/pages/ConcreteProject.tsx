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

	// for (let i = 0; i < products.length; i++) {
	// 	const index = i
	// 	return index
	// }

	return (
		<div className='project' ref={divRef}>
			<table className='highlight centered' style={{ width: '185mm' }}>
				<thead style={{ height: '15mm' }}>
					<tr>
						<th style={{ width: '15mm' }}>Поз.</th>
						<th style={{ width: '65mm' }}>Наименование</th>
						<th style={{ width: '15mm' }}>Кол.</th>
						<th style={{ width: '60mm' }}>Параметры</th>
						<th style={{ width: '30mm' }}>Примечание</th>
					</tr>
				</thead>
				<tbody>
					{
						products.map((obj, id: number) => {
							return (
								<tr key={id}>
									<td>{id+1}</td>
									<td>{obj.title}</td>
									<td>{obj.count}</td>
									<td>{obj.parameters}</td>
									<td>{obj.from_whom}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
			<button className='btn btn-small my-btn-red' onClick={handleDelete}>Удалить проект</button>
		</div>
	)
}

export default ConcreteProject