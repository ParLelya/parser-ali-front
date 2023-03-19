import React from 'react'

const Projects: React.FC = () => {
	return (
		<>
			<h1>Мои проекты</h1>
			<div className='projects'>
				<div className='project-card'>
					<span>Project title</span>
				</div>
				<div className='project-card'>
					<span>Project title</span>
				</div>
				<div className='project-card'>
					<span>Project title</span>
				</div>
				<div className='create-project project-card'>
					<i className="material-icons" style={{ fontSize: '6rem' }}>add</i>
					<span>Нажмите, чтобы создать новый проект</span>
				</div>
			</div>
		</>
	)
}

export default Projects