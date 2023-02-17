import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { UserLoginRequest, UserRegisterRequest } from '../auth/models/request-user.model';
import { UserModel } from '../models/user.model';

declare const google: any

const apiUrl = environment.apiUrl;



@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserModel;

  constructor(private readonly http: HttpClient,
    private router: Router,
    private ngZone: NgZone) { }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${apiUrl}/login/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      tap((resp: any) => {
        // console.log(resp);
        const {email, google, image, name, role, uid} = resp.userDB; // se usa la desestructuración de objetos

        this.user = new UserModel(name, email, '', image, google, role, uid);
        // console.log(this.user);

        localStorage.setItem('token', resp.token)
      }),
      // ahora transformamos la respuesta a un valor booleano
      map(resp => true), // si se obtiene una respuesta retornamos true
      catchError(error => of(false)) // of permite crear un nuevo Observable en base al valor que se ponga como parametro
    );
  }

  add(body: UserRegisterRequest) {
    return this.http.post(`${apiUrl}/usuario`, body)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      );
  }

  login(body: UserLoginRequest) {
    return this.http.post(`${apiUrl}/login`, body)
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
    return this.http.post(`${apiUrl}/login/google`, { token })
      .pipe(
        tap((res: any) => { // tap me permite disparar un efecto secundario
          // console.log(res);
          localStorage.setItem('token', res.token) // Guardo el token el el local storage
        })
      )
  }
}