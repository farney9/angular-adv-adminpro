import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DoctorModel } from '../models/doctor.model';

const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor( private readonly http: HttpClient,) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token }
    }
  }

  listDoctors() {
    const url = `${apiUrl}/doctor`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, doctor: DoctorModel[] }) => resp.doctor)
      )
  }

  add(doctorName: string, hospitalId: string) {
    const url = `${apiUrl}/doctor`
    return this.http.post(url, { name: doctorName, hospital: hospitalId }, this.headers)
      .pipe(
        map((resp: { ok: boolean, doctor: DoctorModel}) => resp.doctor)
      )
  }
}
