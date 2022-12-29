import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthCreds } from '../auth-api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  signin = jest.fn<Observable<void>, [AuthCreds]>(() => new Observable());

  signup = jest.fn<Observable<void>, [AuthCreds]>(() => new Observable());
}
