import { IToken, IUser } from "./User";

export interface AuthResponse {
	token: IToken
	user: IUser
}