import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { UserLoginRequest, UserRegisterRequest } from '../auth/models/request-user.model';

declare const google: any

const base_url = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      // ahora transformamos la respuesta a un valor booleano
      map(resp => true), // si se obtiene una respuesta retornamos true
      catchError(error => of(false)) // of permite crear un nuevo Observable en base al valor que se ponga como parametro
    );
  }

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

  logOut() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('farney9@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => { // tap me permite disparar un efecto secundario
          // console.log(res);
          localStorage.setItem('token', res.token) // Guardo el token el el local storage
        })
      )
  }

}