import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from '../../components/input/input.component';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { AuthApiService as AuthApiServiceStub } from '../../services/auth-api/__mocks__/auth-api.service';
import { SigninFormComponent } from './signin-form.component';

describe('SigninFormComponent', () => {
  let component: SigninFormComponent;
  let fixture: ComponentFixture<SigninFormComponent>;
  const apiServiceStub = new AuthApiServiceStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninFormComponent, InputComponent],
      providers: [{ provide: AuthApiService, useValue: apiServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Renders', () => {
    expect(fixture).toMatchSnapshot();
  });
});
