import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { RootState } from '../store/store'
import { createProject } from '../slices/projectSlice'
import Loader from './Loader'

interface IModalProps {
	open: boolean
	setOpen: (open: boolean) => void
	children?: React.ReactNode
}

const ModalProject: React.FC<IModalProps> = ({ open, setOpen }) => {

	const dispatch = useAppDispatch()
	const { isLoading } = useAppSelector((state: RootState) => state.projects)
	const { id } = useAppSelector((state: RootState) => state.auth.user)
	const [title, setTitle] = useState<string>('')

	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(createProject({ title: title, user: id }))
		setOpen(false)
	}

	if (isLoading) return <Loader />

	return (
		<div
			className={open ? 'modal_bg active' : 'modal_bg'}
			onClick={() => setOpen(false)}
		>
			<form
				className="my-modal modal-project"
				onClick={e => e.stopPropagation()}
			>
				<legend><h5>Создание нового проекта</h5></legend>
				<div className="row">
					<div className="input-field col s12">
						<input
							id="username"
							type="text"
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
						<label htmlFor="username">Введите назавние</label>
					</div>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
					<button
						className='btn my-btn-blue'
						type='submit'
						onClick={handleSubmit}
					>Создать проект</button>
					<button
						className='btn my-btn-white'
						type='reset'
						onClick={() => setOpen(false)}
					>Закрыть окно</button>
				</div>
			</form>
		</div>
	)
}

export default ModalProject