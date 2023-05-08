import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { RoutePath } from '../routing/app-routing.module';
import { ApiError } from './api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  post(...args: Parameters<HttpClient['post']>) {
    return this.http.post(...args).pipe(
      catchError((err) => {
        this.handleAuthError(err);
        return of(err);
      })
    );
  }

  get(...args: Parameters<HttpClient['get']>) {
    return this.http.get(...args).pipe(
      catchError((err) => {
        this.handleAuthError(err);
        return of(err);
      })
    );
  }

  handleAuthError(err: ApiError<any, any>) {
    if (err.statusCode === 401) {
      this.router.navigate([RoutePath.Signin]);
    }
  }
}
