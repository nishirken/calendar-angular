import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthCreds } from '../../services/auth-api/auth-api.interfaces';
import { AuthFormTestIds } from 'calendar-test-ids';

export const requiredMessage = 'The field can\'t be empty';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.sass']
})
export class AuthFormComponent {
  constructor() {
  }

  emailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  buttonText = '';
  hintText = '';
  hintLinkText = '';
  hintLinkHref = '';
  emailErrorMessage = '';
  passwordErrorMessage = '';

  href = '/'; // trigger link rerender, otherwise wired-link remains invisible

  testIds?: AuthFormTestIds;

  handleLinkClick = (ev: MouseEvent): void => {
    ev.preventDefault();
  };

  handleSubmit = (): void => {
    if (this.emailControl.invalid) {
      this.emailErrorMessage = requiredMessage;
    }
    if (this.passwordControl.invalid) {
      this.passwordErrorMessage = requiredMessage;
    }
    if (this.emailControl.invalid || this.passwordControl.invalid) {
      return;
    }
    return this.submit({email: this.emailControl.value!, password: this.passwordControl.value!});
  };

  submit = (creds: AuthCreds): void => {};

  handleEmailChange(event: Event) {
    this.emailErrorMessage = '';
    this.emailControl.setValue((event.target as HTMLInputElement).value);
  };

  handlePasswordChange(event: Event) {
    this.passwordErrorMessage = '';
    this.passwordControl.setValue((event.target as HTMLInputElement).value);
  };

  get isButtonDisabled(): boolean {
    return this.emailErrorMessage !== '' || this.passwordErrorMessage !== '';
  }
}
