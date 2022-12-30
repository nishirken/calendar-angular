import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninFormComponent } from './auth/signin-form/signin-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { RoutePath } from './route-path';
import { WeekComponent } from './week/week/week.component';

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
