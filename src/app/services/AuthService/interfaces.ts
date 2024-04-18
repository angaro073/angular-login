import { User } from "../UserService/interfaces";

export interface UserCreationData {
	username: string,
	firstName: string,
	lastName: string,
	email: string,
	password: string
}

export interface UserCreationResponse {
	user: User,
	success: boolean,
	message: string
}