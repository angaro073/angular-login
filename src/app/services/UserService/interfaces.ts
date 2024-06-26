export interface User {
	id: number,
  username: string,
	firstName: string,
	lastName: string,
	email: string,
	token: string,
	rol: Roles
}

export enum Roles {
	Administrator = "ADMIN",
	Writer = "WRITER",
	Reader = "READER"
}

export interface Token {
	token: string
}