import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signupFormTestIds } from 'calendar-test-ids';
import { RoutePath } from '../../route-path';
import {
  AuthCreds,
  PasswordInvalidErrorCode,
  SignupApiError,
  SignupErrorCode,
} from '../../services/auth-api/auth-api.interfaces';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { AuthFormComponent } from '../auth-form/auth-form.component';

@Component({
  selector: 'app-signup-form',
  templateUrl: '../auth-form/auth-form.component.html',
  styleUrls: ['../auth-form/auth-form.component.sass'],
})
export class SignupFormComponent extends AuthFormComponent {
  constructor(private authApiService: AuthApiService, private router: Router) {
    super();
  }

  override buttonText = 'Sign up';
  override hintText = 'Already have an account?';
  override hintLinkText = 'Sign in';
  override hintLinkHref = '/auth/signin';
  override testIds = signupFormTestIds;

  override submit = (creds: AuthCreds) => {
    this.authApiService.signup(creds).subscribe({
      next: () => this.router.navigate([RoutePath.Week]),
      error: this.handleError,
    });
  };

  private handleError = (error: SignupApiError) => {
    switch (error.error.code) {
      case SignupErrorCode.EmailInvalid:
        this.emailErrorMessage = `Invalid: ${error.error.data.reason}`;
        break;
      case SignupErrorCode.UserExists:
        this.emailErrorMessage = 'This email already exists';
        break;
      case SignupErrorCode.PasswordInvalid:
        const firstError = error.error.data[0];
        if (!firstError) {
          return;
        }
        switch (firstError.code) {
          case PasswordInvalidErrorCode.TooShort:
            this.passwordErrorMessage = `Must have at least ${firstError.minLength} symbols`;
            break;
          case PasswordInvalidErrorCode.TooLong:
            this.passwordErrorMessage = `Must have max ${firstError.maxLength} symbols`;
            break;
          case PasswordInvalidErrorCode.ReqChars:
            this.passwordErrorMessage = `Missing ${firstError.minimumAmount} ${firstError.characterCategory} symbols`;
            break;
          case PasswordInvalidErrorCode.InvalidChars:
            this.passwordErrorMessage = `Invalid symbols ${firstError.invalidCharacters}`;
        }
    }
  };
}
