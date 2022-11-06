import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from '../../app-routing.module';
import { ApiError } from '../../services/api.interfaces';
import { AuthCreds, SigninErrorCode } from '../../services/auth-api/auth-api.interfaces';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { AuthFormComponent } from '../auth-form/auth-form.component';

const errorMessage = "Email or password are invalid";

@Component({
  selector: 'app-signin-form',
  templateUrl: '../auth-form/auth-form.component.html',
  styleUrls: ['../auth-form/auth-form.component.sass']
})
export class SigninFormComponent extends AuthFormComponent {
  constructor(private authApiService: AuthApiService, private router: Router) {
    super();
  }

  override buttonText = "Sign in";
  override hintText = "Do not have an account yet?";
  override hintLinkText = "Sign up";
  override hintLinkHref = "/auth/signup";

  override submit = (creds: AuthCreds) => {
    this.authApiService.signin(creds)
      .subscribe({
        next: () => this.router.navigate([RoutePath.Week]),
        error: (err: ApiError<SigninErrorCode>) => {
          this.emailErrorMessage = errorMessage;
          this.passwordErrorMessage = errorMessage;
        },
    });
  };

  override handleEmailChange(event: Event) {
    super.handleEmailChange(event);
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
  }

  override handlePasswordChange(event: Event) {
    super.handlePasswordChange(event);
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
  }
}
