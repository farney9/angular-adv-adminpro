import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRegisterRequest } from '../auth/models/request-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  add(body: UserRegisterRequest) {
    return this.http.post(`${environment.apiUrl}/usuario`, body)
  }
}