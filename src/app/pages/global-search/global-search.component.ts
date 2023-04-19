import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DoctorModel } from '../../models/doctor.model';
import { HospitalModel } from '../../models/hospital.model';
import { UserModel } from '../../models/user.model';

import { SearchesService } from '../../services/searches.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styles: [
  ]
})
export class GlobalSearchComponent implements OnInit {

  doctors: DoctorModel[] = [];
  hospitals: HospitalModel[] = [];
  users: UserModel[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private searchesService: SearchesService,
               private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({term}) => this.onSearchAll(term))
  }

  onSearchAll(searchTerm: string) {
    this.searchesService.searchAll(searchTerm)
      .subscribe(
        {
          next: (resp: any) => {
            // console.log(resp);
            this.doctors = resp.doctors
            this.hospitals = resp.hospitals
            this.users = resp.usuarios
            console.log(this.users);

          },
          error: (err) => {
            console.log(err);
          }
        }
       )
  }

  openDoctor(doctor: DoctorModel) {
    if ( !doctor) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/doctors/${doctor.id}`);
  }

}
