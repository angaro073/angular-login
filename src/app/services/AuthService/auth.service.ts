import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegisterData, AuthResponse, UserLoginData } from './interfaces';
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
}
