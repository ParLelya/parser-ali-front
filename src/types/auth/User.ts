export interface IAuth {
	email: string
	password: string
}

export interface ISignUp extends IAuth {
	username: string
}

export interface IUser {
	id: number
	username: string
	email: string
	is_active?: boolean
	staff?: boolean
}

export interface IToken {
	access: string
	refresh: string
}