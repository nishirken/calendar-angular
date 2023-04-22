import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../routing/app-routing.module';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AuthApiService } from '../services/auth-api/auth-api.service';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [SigninFormComponent, SignupFormComponent],
  imports: [CommonModule, AppRoutingModule, ComponentsModule],
  providers: [AuthApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
