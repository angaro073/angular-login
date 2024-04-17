import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
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
}
