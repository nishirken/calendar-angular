import { FormControl, Validators } from '@angular/forms';
import { AuthCreds } from '../../services/auth-api/auth-api.interfaces';
import { AuthFormTestIds } from 'calendar-test-ids';

export const requiredMessage = "The field can't be empty";

export abstract class AuthFormComponent {
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
    this.submit({
      email: this.emailControl.value!,
      password: this.passwordControl.value!,
    });
  };

  abstract submit: (creds: AuthCreds) => void;

  handleEmailChange(event: Event) {
    this.emailErrorMessage = '';
    if ((event.target as HTMLInputElement)?.value !== undefined) {
      this.emailControl.setValue((event.target as HTMLInputElement)?.value);
    }
  }

  handlePasswordChange(event: Event) {
    this.passwordErrorMessage = '';
    if ((event.target as HTMLInputElement)?.value !== undefined) {
      this.passwordControl.setValue((event.target as HTMLInputElement)?.value);
    }
  }

  get isButtonDisabled(): boolean {
    return this.emailErrorMessage !== '' || this.passwordErrorMessage !== '';
  }
}
