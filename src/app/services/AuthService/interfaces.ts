import { User } from "../UserService/interfaces";

export interface CreateUser {
	username: string,
	firstName: string,
	lastName: string,
	email: string,
	password: string
}

export interface ResponseCreateUser {
	user: User,
	success: boolean,
	message: string
}