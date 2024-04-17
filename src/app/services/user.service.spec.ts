import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Roles, User } from '../user';

describe('UserService', () => {
	let userService: UserService;
	let httpTestController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		userService = TestBed.inject(UserService);
		httpTestController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestController.verify();
	})

	it('should be created', () => {
		expect(userService).toBeTruthy();
	});

	/* 
	* Create a new user. || RESPONSE SCHEMA: User (200), {"username": string, "firstName": string, "lastName": string, "email": string, "password": string}}
	* Return a user by its id. || RESPONSE SCHEMA: 
	* Update an existing user. || RESPONSE SCHEMA: 
	* Delete an existing user. || RESPONSE SCHEMA: 
	* Get user profile. || RESPONSE SCHEMA: 
	*/
	it('should return every user', () => {
		let mockUserArray: User[] = [];
		let mockResponse: User[] = [
			{
				id: 1,
				username: "peter1234",
				firstName: "Peter",
				lastName: "Sánchez",
				email: "peter1234@gmail.com",
				token: "ATOKEN",
				rol: Roles.Administrator
			},
			{
				id: 2,
				username: "paul7777",
				firstName: "Paul",
				lastName: "Robinson",
				email: "paul7777@hotmail.com",
				token: "BTOKEN",
				rol: Roles.Staff
			}
		];

		userService.getAllUsers().subscribe((users) => {
			mockUserArray = users;
		});

		let mockRequest = httpTestController.expectOne(userService.apiURL);
		mockRequest.flush(mockResponse);
		expect(mockUserArray).toEqual(mockResponse);
	});

	it('should create a new user')
	it('should return a user by id', () => {
		let mockUser: User;
		let mockResponse: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Staff
		};
		
		let userId = mockResponse.id;

		userService.getUserById(userId).subscribe((user) => {
			mockUser = user;
		});
		
		let mockRequest = httpTestController.expectOne(`${userService.apiURL}/${userId}`);
		mockRequest.flush(mockResponse);
		expect(mockUser!).toEqual(mockResponse);
	})
	it('should update existing user')
	it('should delete existing user')
	it('should get user profile')
});
