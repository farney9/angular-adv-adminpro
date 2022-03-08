import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { UserLoginRequest, UserRegisterRequest } from '../auth/models/request-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  add(body: UserRegisterRequest) {
    return this.http.post(`${environment.apiUrl}/usuario`, body)
    .pipe(
      tap( (res: any ) => { 
        localStorage.setItem('token', res.token)
      })
    );
  }

  login(body: UserLoginRequest) {
    return this.http.post(`${environment.apiUrl}/login`, body)
      .pipe(
        tap( (res: any ) => { 
          localStorage.setItem('token', res.token)
        })
      );
  }
}