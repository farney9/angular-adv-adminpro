import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { UserLoginRequest, UserRegisterRequest } from '../auth/models/request-user.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  add(body: UserRegisterRequest) {
    return this.http.post(`${base_url}/usuario`, body)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      );
  }

  login(body: UserLoginRequest) {
    return this.http.post(`${base_url}/login`, body)
      .pipe(
        tap((res: any) => {
          // console.log(res);
          localStorage.setItem('token', res.token)
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          // console.log(res);
          localStorage.setItem('token', res.token)
        })
      )
  }

}