import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { UserLoginRequest, UserRegisterRequest } from '../auth/models/request-user.model';
import { UploadUserModel } from '../models/upload-user.model';
import { UserProfileModel } from '../models/user-profile.model';
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

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.user.uid || '';
  }

  get headers(){
    return {
       headers: { 'x-token': this.token }
    }

  }

  validateToken(): Observable<boolean> {

    google.accounts.id.initialize({
      client_id: "646045301133-u7tdr38u7lmrfgq1ivr97f7721cebjd3.apps.googleusercontent.com",
    })

    return this.http.get(`${apiUrl}/login/renew`, {
      headers: { 'x-token': this.token }
    }).pipe(
      map((resp: any) => {
        // console.log(resp);
        const { email, google, image = '', name, role, uid } = resp.userDB; // se usa la desestructuración de objetos

        this.user = new UserModel(name, email, '', image, google, role, uid);
        // console.log(this.user);

        localStorage.setItem('token', resp.token)
        return true;
      }),
      // ahora transformamos la respuesta a un valor booleano
      // map(resp => true), // si se obtiene una respuesta retornamos true
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

  updateUser(body: UserProfileModel) { // tambien se podrria Crear una interfaz
    body = {
      ...body,
      role: this.user.role
    }

    return this.http.put(`${apiUrl}/usuario/${this.uid}`, body, { headers: { 'x-token': this.token } });
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

  uploadUsers(from:number = 0) {
    const url = `${apiUrl}/usuario?desde=${from}`
    return this.http.get<UploadUserModel>(url, this.headers)
          .pipe(
            map( resp => {
              const usersList = resp.usuario.map(
                  newUser => new UserModel(newUser.name, newUser.email, '', newUser.image, newUser.google, newUser.role, newUser.uid)
                );
                console.log(usersList);
              return {
                total: resp.total,
                usuario: usersList
              }
            })
          )
  }
}