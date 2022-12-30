import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signupFormTestIdSelectors } from 'calendar-test-ids';
import { throwError } from 'rxjs';
import { ApiError } from 'src/app/services/api.interfaces';
import {
  PasswordInvalidErrorCode,
  SignupApiError,
  SignupErrorCode,
} from '../../services/auth-api/auth-api.interfaces';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { AuthApiService as AuthApiServiceStub } from '../../services/auth-api/__mocks__/auth-api.service';
import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let nativeElement: HTMLElement;
  let authApiService: AuthApiServiceStub;

  beforeEach(async () => {
    jest.clearAllMocks();
    authApiService = new AuthApiServiceStub();
    await TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      providers: [{ provide: AuthApiService, useValue: authApiService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('Renders', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('Submit form', () => {
    const email = 'd@test.co';
    const password = 'Q12345';
    let submitButton: HTMLButtonElement | null;

    beforeEach(() => {
      submitButton = nativeElement.querySelector(
        signupFormTestIdSelectors.submitButton
      );
      component.emailControl.setValue(email);
      component.passwordControl.setValue(password);
    });

    it('Calls signup api onSubmit', () => {
      submitButton!.click();
      expect(authApiService.signup).toHaveBeenCalledWith({ email, password });
    });

    const mkFormError = (error: SignupApiError): void => {
      authApiService.signup.mockImplementationOnce(() =>
        throwError(() => error)
      );
      submitButton!.click();
      fixture.detectChanges();
    };

    const getEmailError = (): string => {
      const input = fixture.debugElement.query(
        By.css('app-input[type="email"]')
      );
      return input.nativeNode.error;
    };
    const getPasswordError = (): string => {
      const input = fixture.debugElement.query(
        By.css('app-input[type="password"]')
      );
      return input.nativeNode.error;
    };

    test('Invalid email error', () => {
      const reason = 'Not enough length';
      const error: SignupApiError = {
        statusCode: 400,
        error: {
          code: SignupErrorCode.EmailInvalid,
          data: { reason },
        },
      };
      mkFormError(error);
      expect(getEmailError()).toBe(`Invalid: ${reason}`);
    });

    test('Email exists error', () => {
      const error: SignupApiError = {
        statusCode: 400,
        error: {
          code: SignupErrorCode.UserExists,
        },
      } as ApiError<SignupErrorCode.UserExists>;
      mkFormError(error);
      expect(getEmailError()).toBe('This email already exists');
    });

    test('Password too short error', () => {
      const error: SignupApiError = {
        statusCode: 400,
        error: {
          code: SignupErrorCode.PasswordInvalid,
          data: [
            {
              code: PasswordInvalidErrorCode.TooShort,
              minLength: 7,
              providedLength: 6,
            },
          ],
        },
      };
      mkFormError(error);
      expect(getPasswordError()).toBe('Must have at least 7 symbols');
    });

    test('Password too long error', () => {
      const error: SignupApiError = {
        statusCode: 400,
        error: {
          code: SignupErrorCode.PasswordInvalid,
          data: [
            {
              code: PasswordInvalidErrorCode.TooLong,
              maxLength: 5,
              providedLength: 6,
            },
          ],
        },
      };
      mkFormError(error);
      expect(getPasswordError()).toBe('Must have max 5 symbols');
    });

    test('Password too long error', () => {
      const error: SignupApiError = {
        statusCode: 400,
        error: {
          code: SignupErrorCode.PasswordInvalid,
          data: [
            {
              code: PasswordInvalidErrorCode.TooLong,
              maxLength: 5,
              providedLength: 6,
            },
          ],
        },
      };
      mkFormError(error);
      expect(getPasswordError()).toBe('Must have max 5 symbols');
    });

    test('Password missing chars error', () => {
      const error: SignupApiError = {
        statusCode: 400,
        error: {
          code: SignupErrorCode.PasswordInvalid,
          data: [
            {
              code: PasswordInvalidErrorCode.ReqChars,
              minimumAmount: 1,
              providedAmount: 0,
              characterCategory: 'Spec',
            },
          ],
        },
      };
      mkFormError(error);
      expect(getPasswordError()).toBe('Missing 1 Spec symbols');
    });

    test('Password invalid characters error', () => {
      const error: SignupApiError = {
        statusCode: 400,
        error: {
          code: SignupErrorCode.PasswordInvalid,
          data: [
            {
              code: PasswordInvalidErrorCode.InvalidChars,
              invalidCharacters: '\uD83D',
            },
          ],
        },
      };
      mkFormError(error);
      expect(getPasswordError()).toBe('Invalid symbols \uD83D');
    });
  });
});
