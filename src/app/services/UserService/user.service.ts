import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	apiURL: string = "http://localhost:3000/api/users";

  constructor(private httpClient: HttpClient) {}

	getAllUsers(): Observable<User[]> {
		return this.httpClient.get<User[]>(this.apiURL);
	}

	createUser(user: User): Observable<User> {
		return this.httpClient.post<User>(this.apiURL, user);
	}

	getUserById(id: number): Observable<User> {
		return this.httpClient.get<User>(`${this.apiURL}/${id}`);
	}

	updateUserData(userId: number, userData: User): Observable<User> {
		return this.httpClient.put<User>(`${this.apiURL}/${userId}`, userData);
	}

	deleteUser(userId: number): Observable<User> {
		return this.httpClient.delete<User>(`${this.apiURL}/${userId}`);
	}

	getUserProfile(userToken: string): Observable<User> {
		return this.httpClient.post<User>(`${this.apiURL}/profile`, userToken);
	}

	
}
