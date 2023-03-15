import $api from "../http";
import { AxiosResponse } from "axios";
// import { AuthResponse } from "../types/auth/AuthResponse";
import { ISignUp, IAuth, IToken } from "../types/auth/User";

export default class AuthService {
	static async login(value: IAuth): Promise<AxiosResponse<IToken>> {
		return $api.post<IToken>('/auth/token/', value)
	}

	static async registration(value: ISignUp): Promise<AxiosResponse<ISignUp>> {
		return $api.post<ISignUp>('/auth/signUp/', value)
	}

	// static async logout(): Promise<void> {
	// 	return $api.post('/')
	// }
}