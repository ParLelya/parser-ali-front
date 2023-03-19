import $api from "../http";
import { AxiosResponse } from "axios";
import { ISignUp, IUser } from "../types/auth/User";

export default class UserService {
	static getUser(): Promise<AxiosResponse<IUser>> {
		return $api.get<IUser>('/auth/me/')
	}

	static updateUser(email: string, password: string, username: string): Promise<AxiosResponse<IUser>> {
		return $api.patch<ISignUp>('/auth/update/', {email, password, username})
	}
}