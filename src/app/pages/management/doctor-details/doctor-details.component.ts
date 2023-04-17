import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DoctorModel } from '../../../models/doctor.model';
import { HospitalModel } from '../../../models/hospital.model';

import { DoctorService } from '../../../services/doctor.service';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctorForm: FormGroup;
  hospitals: HospitalModel[] = [];
  selectedHospital: HospitalModel;
  doctorSelected: DoctorModel


  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private doctorService: DoctorService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({id}) => this.loadDoctor(id));

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.loadHospitalsList();

    this.doctorForm.get('hospital').valueChanges
      .subscribe(newValue => {
        this.selectedHospital = this.hospitals.find( h => h.id === newValue)
      })
  }

  loadDoctor(doctorId: string) {

    this.doctorService.getDoctorById(doctorId)
      .subscribe( doctorResponse => {
        console.log(doctorResponse);
        this.doctorSelected = doctorResponse;
      })
  }

  loadHospitalsList() {
    this.hospitalService.uploadHospital()
    .subscribe(
      {
        next: (hospitalsResponse) => {
          this.hospitals = hospitalsResponse;
        }
      })
  }

  addDoctor() {
    const {name} = this.doctorForm.value;
    console.log(this.doctorForm.value);

    this.doctorService.add(this.doctorForm.value)
      .subscribe(
        {
          next: (doctorResponse: any) => {
            Swal.fire({
              title: 'Added!',
              html: `<b>${name}</b>`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
            this.doctorSelected = doctorResponse;
            this.router.navigateByUrl(`/dashboard/doctors/${doctorResponse.doctor.id}`)
          },
          error: (err) => {
            console.log(err);
            Swal.fire('Error', err.error.msg, 'error');
          }
        }
      )
  }

}
