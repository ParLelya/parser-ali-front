import $api, {API_URL} from "../http";
import axios, { AxiosResponse } from "axios";
import { ISignUp, IAuth, IToken, IUser } from "../types/auth/User";

export default class AuthService {
	static async login(value: IAuth): Promise<AxiosResponse<IToken, IUser>> {
		return $api.post<IToken>('/auth/token/', value)
	}

	static async registration(value: ISignUp): Promise<AxiosResponse<IUser>> {
		return axios.post<ISignUp>(`${API_URL}/auth/signUp/`, value)
	}
}