import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreationData, UserCreationResponse } from './interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	apiURL: string = "http://localhost:3000/api"

  constructor(private httpClient: HttpClient) { }

  registerUser(user: UserCreationData): Observable<UserCreationResponse> {
		return this.httpClient.post<UserCreationResponse>(`${this.apiURL}/signup`, user);
	}
}
