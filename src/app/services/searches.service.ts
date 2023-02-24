import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

  search(
    userType: 'usuario' | 'doctor' | 'hospital',
    searchTerm: string = ''
  ) {
    const url = `${apiUrl}/search/collection/${userType}/${searchTerm}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( (resp: any) => resp.results)
      );
  }
}
