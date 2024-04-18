import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Roles, Token, User } from './interfaces';

describe('UserService', () => {
	let userService: UserService;
	let httpTestController: HttpTestingController;
	let mockRequest: TestRequest;
	let mockUser: User;

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
				rol: Roles.Staff
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

	it('should create a new user', () => {
		let mockUserToCreate: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Staff
		};

		userService.createUser(mockUserToCreate).subscribe((newUser) => {
			mockUser = newUser;
		});

		mockRequest = httpTestController.expectOne(userService.apiURL);
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush(mockUserToCreate);
		expect(mockUser!).toEqual(mockUserToCreate);
	});

	it('should return a user by id', () => {
		let mockUserToReturn: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Staff
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

	it('should update existing user', () => {
		mockUser = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Staff
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

	it('should delete existing user', () => {
		let mockUserToDelete: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Staff
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

	it('should get user profile', () => {
		let mockUserToReturn: User = {
			id: 2,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.Staff
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
});
