import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninFormComponent } from './auth/signin-form/signin-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { WeekComponent } from './week/week/week.component';

export enum RoutePath {
  Signin = 'auth/signin',
  Signup = 'auth/signup',
  Week = 'week',
}

const routes: Routes = [
  { path: '', redirectTo: RoutePath.Signin, pathMatch: 'full' }, // initial
  { path: RoutePath.Signin, component: SigninFormComponent },
  { path: RoutePath.Signup, component: SignupFormComponent },
  { path: RoutePath.Week, component: WeekComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
