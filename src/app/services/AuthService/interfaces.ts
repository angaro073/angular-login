import { User } from "../UserService/interfaces";

export interface UserRegisterData {
	username: string,
	firstName: string,
	lastName: string,
	email: string,
	password: string
}

export interface UserLoginData {
	email: string,
	password: string
}

export interface AuthResponse {
	user: User,
	success: boolean,
	message: string
}