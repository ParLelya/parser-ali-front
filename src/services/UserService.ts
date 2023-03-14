import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../types/auth/User";

export default class UserService {
	static getUser(): Promise<AxiosResponse<IUser>> {
		return $api.get<IUser>('/auth/me/')
	}
}