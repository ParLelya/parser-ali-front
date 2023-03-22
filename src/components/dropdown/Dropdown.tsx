import React, { useState } from 'react'
import $api from '../../http'
import { IProject } from '../../types/interface'
import './Dropdown.css'

const Dropdown: React.FC = () => {

	const defaultItems: IProject[] = [{ id: 0, title: '' }]
	const [projects, setProjects]: [IProject[], (items: IProject[]) => void] = useState(defaultItems)
	const [open, setOpen] = useState(false)

	const handleClick = () => {
		$api.get(`/api/projects/`)
			.then(response => {
				setProjects(response.data)
			})
			.catch(error => console.error(error.message))
		setOpen(!open)
	}

	return (
		<div className='my-dropdown'>
			<button
				onClick={handleClick}
				className='my-dropdown-trigger btn my-btn-blue'
			>
				{
					open
						? <i className="material-icons" style={{ fontSize: '1.5rem', transform: 'translateY(10%)' }}>arrow_drop_up</i>
						: <i className="material-icons" style={{ fontSize: '1.5rem', transform: 'translateY(10%)' }}>arrow_drop_down</i>
				}
				<span>Добавить к проекту</span>
			</button>
			{open &&
				<div className='my-dropdown-content'>
					<ul>
						{
							projects.map((obj: IProject) => {
								return (
									<li key={obj.id}>
										<span className='my-dropdown-label'>{obj.title}</span>	
									</li>
								)
							})
						}
					</ul>
				</div>
			}
		</div>
	)
}

export default Dropdown