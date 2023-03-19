import axios from "axios";
import { cookies } from "../slices/authSlice";

export const API_URL = `https://parserali.me`

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$api.interceptors.response.use((config) => {
	return config
}, (async (error) => {
	const originalRequest = error.config
	if (error.response.status === 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true
		try {
				const response = await axios.post<string>(`${API_URL}/auth/token/refresh/`, cookies.get('token'))
				localStorage.setItem('token', response.data)
				return $api.request(originalRequest)
		} catch (error: any) {
			console.error('Токен не найден. Необходимо заново войти в свой профиль.')
		}
	} 
	throw error;
}))

export default $api