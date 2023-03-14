import React, { useState } from 'react'
import axios from 'axios';
import { API_URL } from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IResponse {
	task_id: string
	unique_id: string
	status: string
}

const Parser: React.FC = () => {

	const [value, setValue] = useState('')

	const stopReload = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	const parse = () => {
		axios.post<IResponse>(`${API_URL}/scrape/`, { "url": value })
			.then((response) => {
				if (response.data.task_id) {
					toast.success('Успешно отправлено на парсинг')
					setValue('')
				} else {
					throw new Error()
				}
			})
			.catch((error) => {
				toast.error(`При отправке произошла ошибка: ${error.message}`)
			})
	}

	return (
		<form onSubmit={stopReload}>
			<div className="row" >
				<div className="input-field col s12 m8" style={{ width: '100%' }}>
					<input
						id="url"
						type="text"
						required={true}
						value={value}
						onChange={onChangeInput}
						style={{padding: '10px 15px'}}
					/>
					<label htmlFor="url">Вставьте ссылку на страницу, которую хотите парсить</label>
				</div>
			</div>

			<button
				className="btn waves-effect waves-light"
				style={{backgroundColor: '#351BA9'}}
				type="submit"
				onClick={parse}
			>Спарсить
				<i className="material-icons right">send</i>
			</button>

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
		</form>
	)
}

export default Parser