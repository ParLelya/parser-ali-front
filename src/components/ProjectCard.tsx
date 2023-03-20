import React from 'react'
import { IProject } from './../types/interface';
import { Link } from 'react-router-dom';

const ProjectCard: React.FC<IProject> = (props) => {

	const { id, title } = props
	return (
		<Link
			className="card-panel project-card"
			to={`/projects/${id}`}
			key={id}
		>
			<span>{title}</span>
		</Link>
	)
}

export default ProjectCard