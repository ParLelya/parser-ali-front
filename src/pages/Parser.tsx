import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Parser: React.FC = () => {

	const [value, setValue] = useState('')

	useEffect(() => {
		axios.post(`${value}/scrapy/`, {obj: {}})
		.then(() => {
			toast.success('Успешно спарсено')
		})
		.catch((error) => {
			toast.error(`При парсинге произошла ошибка: ${error.message}`)
		})
	}, [value])

	const stopReload = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
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
					/>
					<label htmlFor="url">Вставьте ссылку на страницу, которую хотите парсить</label>
				</div>
			</div>

			<button
				className="btn waves-effect waves-light amber"
				type="submit"
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
				theme="dark"
			/>
		</form>
	)
}

export default Parser