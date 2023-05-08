import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninFormComponent } from '../auth/signin-form/signin-form.component';
import { SignupFormComponent } from '../auth/signup-form/signup-form.component';
import { WeekComponent } from '../week/week/week.component';
import { RoutePath, routePaths } from './routes-paths';

const routes: Routes = [
  { path: '', redirectTo: routePaths.week(new Date()), pathMatch: 'full' }, // initial
  { path: RoutePath.Signin, component: SigninFormComponent },
  { path: RoutePath.Signup, component: SignupFormComponent },
  {
    path: RoutePath.Week,
    redirectTo: routePaths.week(new Date()),
    pathMatch: 'full',
  },
  { path: `${RoutePath.Week}/:year/:month/:day`, component: WeekComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
