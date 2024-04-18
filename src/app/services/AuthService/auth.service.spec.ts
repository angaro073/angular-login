import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, TestRequest, } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { User, Roles } from '../UserService/interfaces';
import { ForgotPasswordData, UserLoginData, UserRegisterData, Token, UserSignoutData } from './interfaces';

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
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush({
			user: mockRegisteredUser,
			success: true,
			message: "Registered correctly"
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
		expect(mockRequest.request.method).toEqual("POST");
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
		expect(mockRequest.request.method).toEqual("PUT");
		mockRequest.flush({
			user: mockUpdatedUser,
			success: true,
			message: "Password changed correctly"
		});
		expect(mockUser).toEqual(mockUpdatedUser);
	});
	
	it('should log out currently logged user', () => {
		let mockUserData: Token = {
			token: "BTOKEN"
		};

		let mockLoggedOutUser: User = {
			id: 1,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.User
		};

		authService.logOutUser(mockUserData).subscribe((response) => {
			mockUser = response.user;
		}); 

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/logout`);
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush({
			user: mockLoggedOutUser,
			success: true,
			message: "Logged out correctly"
		});
		expect(mockUser).toEqual(mockLoggedOutUser);		
	});
	
	it('should sign out currently logged user', () => {
		let mockUserData: UserSignoutData = {
			token: "BTOKEN",
			password: "1234"
		};

		let mockSignedOutUser: User = {
			id: 1,
			username: "paul7777",
			firstName: "Paul",
			lastName: "Robinson",
			email: "paul7777@hotmail.com",
			token: "BTOKEN",
			rol: Roles.User
		};

		authService.signOutUser(mockUserData).subscribe((response) => {
			mockUser = response.user;
		})
		
		mockRequest = httpTestController.expectOne(`${authService.apiURL}/signout`);
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush({
			user: mockSignedOutUser,
			success: true,
			message: "Account successfully deleted"
		});
		expect(mockUser).toEqual(mockSignedOutUser);	
	});
});
