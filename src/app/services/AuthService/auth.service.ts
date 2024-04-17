import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUser, ResponseCreateUser } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { User } from '../UserService/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	apiURL: string = "http://localhost:3000/api"

  constructor(private httpClient: HttpClient) { }

  registerUser(user: CreateUser): Observable<ResponseCreateUser> {
		return this.httpClient.post<ResponseCreateUser>(`${this.apiURL}/users`, user);
	}
}
