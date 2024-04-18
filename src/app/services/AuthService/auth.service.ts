import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegisterData, AuthResponse, UserLoginData, ForgotPasswordData, Token, UserSignoutData } from './interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	apiURL: string = "http://localhost:3000/api"

  constructor(private httpClient: HttpClient) { }

  registerUser(userData: UserRegisterData): Observable<AuthResponse> {
		return this.httpClient.post<AuthResponse>(`${this.apiURL}/signup`, userData);
	}

	logInUser(userData: UserLoginData): Observable<AuthResponse> {
		return this.httpClient.post<AuthResponse>(`${this.apiURL}/login`, userData);
	}

	resetPassword(userData: ForgotPasswordData): Observable<AuthResponse> {
		return this.httpClient.put<AuthResponse>(`${this.apiURL}/forgotpassword`, userData);
	}

	logOutUser(userData: Token): Observable<AuthResponse> {
		return this.httpClient.post<AuthResponse>(`${this.apiURL}/logout`, userData);
	}

	signOutUser(userData: UserSignoutData): Observable<AuthResponse> {
		return this.httpClient.post<AuthResponse>(`${this.apiURL}/signout`, userData);
	}
}
