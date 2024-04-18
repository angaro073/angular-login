import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, TestRequest, } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { User, Roles } from '../UserService/interfaces';
import { UserCreationData } from './interfaces';

describe('AuthService', () => {
  let authService: AuthService;
	let httpTestController: HttpTestingController;
	let mockRequest: TestRequest;
	let mockUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    authService = TestBed.inject(AuthService);
		httpTestController = TestBed.inject(HttpTestingController);
  });

	afterEach(() => {
		httpTestController.verify();
	});

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

	it('should register a new user', () => {
		let mockUserToRegister: UserCreationData = {
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			password: "1234"
		};
		
		let mockRegisteredUser: User = {
			id: 1,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.User
		};

		authService.registerUser(mockUserToRegister).subscribe((response) => {
			mockUser = response.user;
		});

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/signup`);
		mockRequest.flush({
			user: mockRegisteredUser,
			success: true,
			message: "Register correctly"
		});
		expect(mockUser).toEqual(mockRegisteredUser);
	});

	it('should log in an existing user');
	it('should reset a user password');
	it('should log out currently logged user')
	it('should sign out currently logged user')
});
