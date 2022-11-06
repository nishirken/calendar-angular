import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { url } from '../helpers';
import { AuthCreds } from './auth-api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpClient) {
  }
  
  signin = (creds: AuthCreds): Observable<void> => {
    return this.http.post<void>(url('/auth/signin'), creds, {withCredentials: true});
  };

  signup = (creds: AuthCreds): Observable<void> => {
    return this.http.post<void>(url('/auth/signup'), creds, {withCredentials: true}).pipe(
      switchMap(() => this.signin(creds))
    );
  };
}
