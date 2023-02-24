import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private readonly http: HttpClient,
    private router: Router,) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } }
  }

  private transformedUsersList(usersList: any[]): UserModel[] {
    return usersList.map(
      returnedUser => new UserModel(returnedUser.name, returnedUser.email, '', returnedUser.image, returnedUser.google, returnedUser.role, returnedUser.uid)
    )
  }

  search(
    userType: 'usuario' | 'doctor' | 'hospital',
    searchTerm: string = ''
  ) {
    const url = `${apiUrl}/search/collection/${userType}/${searchTerm}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( (resp: any) => {
          switch (userType) {
            case 'usuario':
              return this.transformedUsersList(resp.results)

            default:
              return []
          }
        })
      );
  }
}
