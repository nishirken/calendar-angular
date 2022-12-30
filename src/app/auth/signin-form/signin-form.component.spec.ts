import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoutePath } from '../../route-path';
import { InputComponent } from '../../components/input/input.component';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { AuthApiService as AuthApiServiceStub } from '../../services/auth-api/__mocks__/auth-api.service';
import { SigninFormComponent } from './signin-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { signinFormTestIdSelectors } from 'calendar-test-ids';
import { throwError } from 'rxjs';

describe('SigninFormComponent', () => {
  let component: SigninFormComponent;
  let fixture: ComponentFixture<SigninFormComponent>;
  let apiServiceStub: AuthApiServiceStub;
  let submitButton: HTMLButtonElement | null;
  const email = 'd@m.co';
  const password = 'Q12345';
  const router = { navigate: jest.fn() };

  beforeEach(waitForAsync(() => {
    jest.clearAllMocks();
    apiServiceStub = new AuthApiServiceStub();
    TestBed.configureTestingModule({
      declarations: [SigninFormComponent, InputComponent],
      providers: [
        { provide: AuthApiService, useValue: apiServiceStub },
        { provide: Router, useValue: router },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitButton = fixture.debugElement.query(
      By.css(signinFormTestIdSelectors.submitButton)
    ).nativeElement;
    component.emailControl.setValue(email);
    component.passwordControl.setValue(password);
  }));

  it('Renders', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('Calls signin api', () => {
    submitButton!.click();
    expect(apiServiceStub.signin).toHaveBeenCalledWith({ email, password });
  });

  it('Resets error messages after email has been changed', () => {
    component.emailErrorMessage = 'Email error';
    component.passwordErrorMessage = 'Password error';
    const emailInput = fixture.debugElement.query(
      By.css('app-input[type="email"]')
    );
    emailInput.componentInstance.onInput.next(new InputEvent('input'));
    fixture.detectChanges();
    expect(component.emailErrorMessage).toBe('');
    expect(component.passwordErrorMessage).toBe('');
  });

  it('Resets error messages after password has been changed', () => {
    component.emailErrorMessage = 'Email error';
    component.passwordErrorMessage = 'Password error';
    const emailInput = fixture.debugElement.query(
      By.css('app-input[type="password"]')
    );
    emailInput.componentInstance.onInput.next(new InputEvent('input'));
    fixture.detectChanges();
    expect(component.emailErrorMessage).toBe('');
    expect(component.passwordErrorMessage).toBe('');
  });

  it('Sets error message', () => {
    apiServiceStub.signin.mockImplementationOnce(() =>
      throwError(() => new Error())
    );
    submitButton!.click();
    fixture.detectChanges();
    const testInputError = (type: 'email' | 'password'): void => {
      expect(
        fixture.debugElement.query(By.css(`app-input[type="${type}"]`))
          .componentInstance.error
      ).toBe('Email or password are invalid');
    };
    testInputError('email');
    testInputError('password');
  });
});
