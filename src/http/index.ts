import axios from "axios";

export const API_URL = `https://parserali.me`

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
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
				const response = await axios.post<string>(`${API_URL}/auth/token/refresh/`, {refresh: ''})
				localStorage.setItem('token', response.data)
				return $api.request(originalRequest)
			
		} catch (error: any) {
			console.error('Пользователь не авторизован')
		}
	} 
	throw error;
}))

export default $api