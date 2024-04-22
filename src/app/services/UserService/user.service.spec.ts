import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Roles, Token, User } from './interfaces';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
	let userService: UserService;
	let httpTestController: HttpTestingController;
	let mockRequest: TestRequest;
	let mockUser: User;
	let httpError: HttpErrorResponse;

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

	it('should return every user', () => {
		let mockUserArray: User[] = [];
		let mockUsersToReturn: User[] = [
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
				rol: Roles.Writer
			}
		];

		userService.getAllUsers().subscribe((users) => {
			mockUserArray = users;
		});

		mockRequest = httpTestController.expectOne(userService.apiURL);
		expect(mockRequest.request.method).toEqual("GET");
		mockRequest.flush(mockUsersToReturn);
		expect(mockUserArray).toEqual(mockUsersToReturn);
	});

	it('should be able to handle errors when trying to return every user', () => {
		userService.getAllUsers().subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(userService.apiURL);
		mockRequest.flush('Server error', {
			status: 403,
			statusText: 'Access denied'
		} as HttpErrorResponse);

		if (!httpError)
			throw new Error("Errors can't be handled correctly");

		expect(httpError.status).toEqual(403);
		expect(httpError.statusText).toEqual("Access denied");
	});

	it('should create a new user', () => {
		let mockUserToCreate: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};

		userService.createUser(mockUserToCreate).subscribe((newUser) => {
			mockUser = newUser;
		});

		mockRequest = httpTestController.expectOne(userService.apiURL);
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush(mockUserToCreate);
		expect(mockUser!).toEqual(mockUserToCreate);
	});

	it('should be able to handle errors when trying to create a new user', () => {
		let mockUserToCreate: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};

		userService.createUser(mockUserToCreate).subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(userService.apiURL);
		mockRequest.flush('Server error', {
			status: 403,
			statusText: 'Access denied'
		} as HttpErrorResponse);

		if (!httpError)
			throw new Error("Errors can't be handled correctly");
		
		expect(httpError.status).toEqual(403);
		expect(httpError.statusText).toEqual("Access denied");
	});

	it('should return a user by id', () => {
		let mockUserToReturn: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};

		let userId = mockUserToReturn.id;

		userService.getUserById(userId).subscribe((user) => {
			mockUser = user;
		});

		mockRequest = httpTestController.expectOne(`${userService.apiURL}/${userId}`);
		expect(mockRequest.request.method).toEqual("GET");
		mockRequest.flush(mockUserToReturn);
		expect(mockUser!).toEqual(mockUserToReturn);
	});

	it('should be able to handle errors when trying to get a user by id', () => {
		let mockUserToReturn: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};

		let userId = mockUserToReturn.id;

		userService.getUserById(userId).subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(`${userService.apiURL}/${userId}`);
		mockRequest.flush('Server error', {
			status: 403,
			statusText: 'Access denied'
		} as HttpErrorResponse);

		if (!httpError)
			throw new Error("Errors can't be handled correctly");
		
		expect(httpError.status).toEqual(403);
		expect(httpError.statusText).toEqual("Access denied");
	});

	it('should update existing user', () => {
		mockUser = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};
		let mockUpdatedUser = { ...mockUser, username: "paul1234", email: "paul7777@gmail.com", rol: Roles.Administrator };

		let userId = mockUser.id;

		mockUser.username = "paul7777";
		mockUser.rol = Roles.Administrator;
		mockUser.email = "paul7777@gmail.com";

		userService.updateUserData(userId, mockUser).subscribe((updatedUser) => {
			mockUser = updatedUser;
		});

		mockRequest = httpTestController.expectOne(`${userService.apiURL}/${userId}`);
		expect(mockRequest.request.method).toEqual("PUT");
		mockRequest.flush(mockUpdatedUser);
		expect(mockUser).toEqual(mockUpdatedUser);
	});

	it('should be able to handle errors when trying to update existing user', () => {
		mockUser = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};

		let userId = mockUser.id;

		mockUser.username = "paul7777";
		mockUser.rol = Roles.Administrator;
		mockUser.email = "paul7777@gmail.com";

		userService.updateUserData(userId, mockUser).subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(`${userService.apiURL}/${userId}`);
		mockRequest.flush('Server error', {
			status: 403,
			statusText: 'Access denied'
		} as HttpErrorResponse);

		if (!httpError)
			throw new Error("Errors can't be handled correctly");
		
		expect(httpError.status).toEqual(403);
		expect(httpError.statusText).toEqual("Access denied");
	});

	it('should delete existing user', () => {
		let mockUserToDelete: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};

		let userId = mockUserToDelete.id;

		userService.deleteUser(userId).subscribe((deletedUser) => {
			mockUser = deletedUser;
		});

		mockRequest = httpTestController.expectOne(`${userService.apiURL}/${userId}`);
		expect(mockRequest.request.method).toEqual("DELETE");
		mockRequest.flush(mockUserToDelete);
		expect(mockUser!).toEqual(mockUserToDelete);
	});

	it('should be able to handle errors when trying to delete existing user', () => {
		let mockUserToDelete: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};

		let userId = mockUserToDelete.id;

		userService.deleteUser(userId).subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(`${userService.apiURL}/${userId}`);
		mockRequest.flush('Server error', {
			status: 403,
			statusText: 'Access denied'
		} as HttpErrorResponse);

		if (!httpError)
			throw new Error("Errors can't be handled correctly");
		
		expect(httpError.status).toEqual(403);
		expect(httpError.statusText).toEqual("Access denied");
	});

	it('should get user profile', () => {
		let mockUserToReturn: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};

		let userToken: Token = {
			token: mockUserToReturn.token
		}

		userService.getUserProfile(userToken).subscribe((user) => {
			mockUser = user;
		});

		mockRequest = httpTestController.expectOne(`${userService.apiURL}/profile`);
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush(mockUserToReturn);
		expect(mockUser!).toEqual(mockUserToReturn);
	});

	it('should be able to handle errors when trying to get user profile', () => {
		let mockUserToReturn: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Writer
		};

		let userToken: Token = {
			token: mockUserToReturn.token
		}

		userService.getUserProfile(userToken).subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(`${userService.apiURL}/profile`);
		mockRequest.flush('Server error', {
			status: 403,
			statusText: 'Access denied'
		} as HttpErrorResponse);

		if (!httpError)
			throw new Error("Errors can't be handled correctly");
		
		expect(httpError.status).toEqual(403);
		expect(httpError.statusText).toEqual("Access denied");
	});
});
