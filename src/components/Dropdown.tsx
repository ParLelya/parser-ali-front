import React, { useState } from 'react'
import $api from '../http'
import { IProductItem, IProject, parameters } from '../types/interface'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { getProjects } from '../slices/projectSlice';
import Loader from './Loader';

interface IProductInProject {
	title: string
	parameters: parameters | parameters[]
	from_whom: string
	count: number
	project: number
	price: number
}

const Dropdown: React.FC<IProductItem> = ({ name, parameters }) => {

	const dispatch = useAppDispatch()
	const { projects, isLoading } = useAppSelector((state: RootState) => state.projects)
	const [open, setOpen] = useState(false)

	const handleClick = () => {
		dispatch(getProjects())
		setOpen(!open)
	}

	const pushProduct = (id: number) => {
		$api.post<IProductInProject>(`/api/product_project/`, {
			"title": name,
			"parameters": JSON.stringify(parameters),
			"from_whom": 'AliExpress',
			"count": 1,
			"price": 0,
			"project": id,
		})
			.then(response => {
				toast.success('Успешно добавлено в проект')
				return response.data
			})
			.catch(error => {
				toast.error(`При отправке произошла ошибка: ${error.message}`)
			})
		setOpen(!open)
	}

	if (isLoading) return <Loader />

	return (
		<div className='my-dropdown'>
			<button
				onClick={handleClick}
				className='my-dropdown-trigger btn my-btn-blue'
			>
				{
					open
						? <i
							className="material-icons"
							style={{ fontSize: '1.5rem', transform: 'translateY(10%)' }}
						>arrow_drop_up</i>
						: <i
							className="material-icons"
							style={{ fontSize: '1.5rem', transform: 'translateY(10%)' }}
						>arrow_drop_down</i>
				}
				<span>Добавить к проекту</span>
			</button>
			{open &&
				<div className='my-dropdown-content'>
					<ul>
						{
							projects.map((obj: IProject) => {
								return (
									<li key={obj.id} onClick={() => pushProduct(obj.id)}>
										<span className='my-dropdown-label'>{obj.title}</span>
									</li>
								)
							})
						}
					</ul>
				</div>
			}
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	)
}

export default Dropdown