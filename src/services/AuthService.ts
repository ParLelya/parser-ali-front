import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../types/auth/AuthResponse";
import { ISignUp } from "../types/auth/User";

export default class AuthService {
	static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/auth/token/', {email, password})
	}

	static async registration(email: string, password: string, username: string): Promise<AxiosResponse<ISignUp>> {
		return $api.post<ISignUp>('/auth/signUp/', {email, password, username})
	}

	// static async logout(): Promise<void> {
	// 	return $api.post('/')
	// }
}