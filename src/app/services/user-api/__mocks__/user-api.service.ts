import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../user-api.interfaces";

@Injectable()
export class UserApiService {
    getUser = jest.fn<Observable<User>, []>(() => of({id: 1, email: 'user@mail.com'}));
}