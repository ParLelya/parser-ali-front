import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../types/auth/AuthResponse";
import { ISignUp } from "../types/auth/User";
import { IAuth } from './../types/auth/User';

export default class AuthService {
	static async login(value: IAuth): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/auth/token/', value)
	}

	static async registration(value: ISignUp): Promise<AxiosResponse<ISignUp>> {
		return $api.post<ISignUp>('/auth/signUp/', value)
	}

	// static async logout(): Promise<void> {
	// 	return $api.post('/')
	// }
}