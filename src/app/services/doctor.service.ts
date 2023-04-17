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

  getDoctorById(doctorId: string) {
    const url = `${apiUrl}/doctor/${doctorId}`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, doctor: DoctorModel }) => resp.doctor)
      )

  }

  add(doctor: {name: string, hospital: string}) {

    const url = `${apiUrl}/doctor`
    return this.http.post(url, doctor, this.headers);
      // .pipe(
      //   map((resp: { ok: boolean, doctor: {name: string, hospital: string}}) => resp.doctor)
      // )
  }

  edit(doctor: DoctorModel ) {
    const url = `${apiUrl}/doctor/${doctor.id}`
    return this.http.put(url, { name: doctor.name, hospital: doctor.hospital._id}, this.headers)
      .pipe(
        map((resp: { ok: boolean, doctor: DoctorModel }) => resp.doctor)
      )
  }

  delete(doctorId: string) {
    const url = `${apiUrl}/doctor/${doctorId}`
    return this.http.delete(url, this.headers);
  }
}
