import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, TestRequest, } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { User } from '../user';

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

	it('should register a new user');
	it('should log in an existing user');
	it('should reset a user password');
	it('should log out currently logged user')
	it('should sign out currently logged user')
});
