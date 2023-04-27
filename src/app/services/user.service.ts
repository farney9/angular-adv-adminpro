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

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers(){
    return {
       headers: { 'x-token': this.token }
    }
  }

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu) );
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
        this.saveLocalStorage(resp.token, resp.menu);
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
        tap((resp: any) => {
          this.saveLocalStorage(resp.token, resp.menu);
        })
      );
  }

  updateUser(user: UserModel) { // tambien se podrria Crear una interfaz
    return this.http.put(`${apiUrl}/usuario/${user.uid}`, user, this.headers);
  }

  updateUserProfile(body: UserProfileModel) { // tambien se podrria Crear una interfaz
    body = {
      ...body,
      role: this.user.role
    }

    return this.http.put(`${apiUrl}/usuario/${this.uid}`, body, this.headers);
  }

  login(body: UserLoginRequest) {
    return this.http.post(`${apiUrl}/login`, body)
      .pipe(
        tap((resp: any) => {
          // console.log(res);
          this.saveLocalStorage(resp.token, resp.menu);
        })
      );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    google.accounts.id.revoke('farney9@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

  loginGoogle(token: string) {
    return this.http.post(`${apiUrl}/login/google`, { token })
      .pipe(
        tap((resp: any) => { // tap me permite disparar un efecto secundario
          // console.log(res);
          this.saveLocalStorage(resp.token, resp.menu);// Guardo el token y el menú en el local storage
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
                // console.log(usersList);
              return {
                total: resp.total,
                usuario: usersList
              }
            })
          )
  }

  delete(user: UserModel) {
    const url = `${apiUrl}/usuario/${user.uid}`
    return this.http.delete(url, this.headers);
  }
}