import { IUser } from "./User";

export interface AuthResponse {
	access: string
	refresh: string
	user?: IUser
}