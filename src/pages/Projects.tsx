import React, { useState, useEffect } from 'react'
import $api from '../http'
import { IProject } from '../types/interface'
import Loader from '../components/Loader'
import ProjectCard from '../components/ProjectCard';
import ModalProject from './../components/modal/project/ModalProject';

const Projects: React.FC = () => {

	const defaultItems: IProject[] = [{ id: 0, title: '' }]
	const [projects, setProjects] = useState<IProject[]>(defaultItems)
	const [isLoading, setIsLoading] = useState(true)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		$api.get(`/api/projects/`)
			.then(response => {
				setProjects(response.data)
				setIsLoading(false)
			})
			.catch(error => console.error(error.message))
	}, [open])

	return (
		<>
			<h1>Мои проекты</h1>
			<div className='projects'>
				{
					isLoading
						? <Loader />
						: projects.map((obj: IProject) => <ProjectCard id={obj.id} title={obj.title}  key={obj.id}/>)
				}
				<div className='create-project project-card' onClick={() => setOpen(true)}>
					<i className="material-icons" style={{ fontSize: '6rem' }}>add</i>
					<span>Нажмите, чтобы создать новый проект</span>
				</div>
			</div>
			<ModalProject open={open} setOpen={setOpen}>
			</ModalProject>
		</>
	)
}

export default Projects