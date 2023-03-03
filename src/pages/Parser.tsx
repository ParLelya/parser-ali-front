import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Parser: React.FC = () => {

	const stopReload = ((e: React.FormEvent<HTMLFormElement>) => e.preventDefault())
	const handleSubmit = () => {
		toast.success('Успешно спарсено')
		// toast.error('При парсинге произошла ошибка')
	}
	return (
		<form onSubmit={stopReload}>
			<div className="row" >
				<div className="input-field col s12 m8" style={{ width: '100%' }}>
					<input id="url" type="text" required={true} />
					<label htmlFor="url">Вставьте ссылку на страницу, которую хотите парсить</label>
				</div>
			</div>

			<button
				className="btn waves-effect waves-light amber"
				type="submit"
				onClick={handleSubmit}
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