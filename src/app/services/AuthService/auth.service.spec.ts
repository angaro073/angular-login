import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, TestRequest, } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { User, Roles } from '../UserService/interfaces';
import { ForgotPasswordData, UserLoginData, UserRegisterData } from './interfaces';

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
		let mockUserData: UserRegisterData = {
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

		authService.registerUser(mockUserData).subscribe((response) => {
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

	it('should log in an existing user', () => {
		let mockUserData: UserLoginData = {
			email: "paul7777@hotmail.com",
			password: "1234"
		};

		let mockLoggedUser: User = {
			id: 1,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.User
		};

		authService.logInUser(mockUserData).subscribe((response) => {
			mockUser = response.user;
		});

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/login`);
		mockRequest.flush({
			user: mockLoggedUser,
			success: true,
			message: "Logged correctly"
		});
		expect(mockUser).toEqual(mockLoggedUser);
	});
	
	it('should reset a user password', () => {
		let mockUserData: ForgotPasswordData = {
			token: "BTOKEN",
			oldPassword: "1234",
			newPassword: "5678"
		};

		let mockUpdatedUser: User = {
			id: 1,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.User
		};

		authService.resetPassword(mockUserData).subscribe((response) => {
			mockUser = response.user;
		});

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/forgotpassword`);
		mockRequest.flush({
			user: mockUpdatedUser,
			success: true,
			message: "Password updated correctly"
		});
		expect(mockUser).toEqual(mockUpdatedUser);
	});
	
	it('should log out currently logged user')
	it('should sign out currently logged user')
});
