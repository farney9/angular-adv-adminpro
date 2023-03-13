import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HospitalModel } from '../models/hospital.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private readonly http: HttpClient,
    private router: Router,) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token }
    }
  }

  uploadHospital() {
    const url = `${apiUrl}/hospital`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, hospital: HospitalModel[] }) => resp.hospital)
      )
  }

  add(hospitalName: string) {
    const url = `${apiUrl}/hospital`
    return this.http.post(url, { hospitalName }, this.headers)
      .pipe(
        map((resp: { ok: boolean, hospital: HospitalModel[] }) => resp.hospital)
      )
  }

  edit(hospitalId: string, hospitalName: string ) {
    const url = `${apiUrl}/hospital/${hospitalId}`
    return this.http.put(url, { hospitalName }, this.headers)
      .pipe(
        map((resp: { ok: boolean, hospital: HospitalModel[] }) => resp.hospital)
      )
  }

  delete(hospitalId: string) {
    const url = `${apiUrl}/hospital/${hospitalId}`
    return this.http.delete(url, this.headers);
  }
}

