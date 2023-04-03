import $api from "../http";
import { AxiosResponse } from "axios";
import { ISignUp, IUser } from "../types/auth/User";

export interface IPatchInfo {
	email?: string
	password?: string
	username?: string
}

export default class UserService {
	static getUser(): Promise<AxiosResponse<IUser>> {
		return $api.get<IUser>('/auth/me/')
	}

	static updateUser(value: IPatchInfo): Promise<AxiosResponse<IUser>> {
		return $api.patch<ISignUp>('/auth/update/', value)
	}
}