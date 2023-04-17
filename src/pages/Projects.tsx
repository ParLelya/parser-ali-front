import React, { useState, useEffect } from 'react'
import { IProject } from '../types/interface'
import Loader from '../components/Loader'
import ProjectCard from '../components/ProjectCard';
import ModalProject from '../components/ModalProject';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getProjects } from '../slices/projectSlice';
import { RootState } from '../store/store';

const Projects: React.FC = () => {

	const dispatch = useAppDispatch()
	const { projects, isLoading } = useAppSelector((state: RootState) => state.projects)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		dispatch(getProjects())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<h1>Мои проекты</h1>
			<div className='projects'>
				{
					isLoading
						? <Loader />
						: projects.map((obj: IProject) => <ProjectCard id={obj.id} title={obj.title} key={obj.id} />)
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