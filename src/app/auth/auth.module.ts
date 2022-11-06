import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { InputComponent } from '../components/input/input.component';
import { AuthApiService } from '../services/auth-api/auth-api.service';

@NgModule({
  declarations: [
    AuthFormComponent,
    SigninFormComponent,
    SignupFormComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  providers: [AuthApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
