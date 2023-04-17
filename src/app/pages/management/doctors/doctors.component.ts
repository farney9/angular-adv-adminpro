import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { DoctorModel } from '../../../models/doctor.model';

import { DoctorService } from '../../../services/doctor.service';
import { ModalService } from '../../../services/modal.service';
import { SearchesService } from '../../../services/searches.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  imageSubscription?: Subscription;
  doctors: DoctorModel[] = [];
  doctorsTemp: DoctorModel[] = [];

  constructor(
    private doctorService: DoctorService,
    private searchesService: SearchesService,
    private modalService: ModalService
  ) { }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.updateDoctorsList();
    this.imageSubscription = this.modalService.newImageEvent
      .pipe(delay(100))
      .subscribe(img => this.updateDoctorsList());
  }

  searchByTerm(term: string) {
    if (term.length === 0) {
      return this.doctors = this.doctorsTemp;
    }

    this.searchesService.search('doctor', term)
      .subscribe({
        next: (response: DoctorModel[]) => {
          this.doctors = response
        }
      })
  }


  // addDoctor(doctor: DoctorModel) {
  //   this.doctorService.add(doctor)
  //     .subscribe(
  //       {
  //         next: (doctorResponse) => {
  //           Swal.fire({
  //             title: 'Added!',
  //             html: `<b>${doctorResponse.name}</b>`,
  //             icon: 'success',
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //           this.updateDoctorsList();
  //         },
  //         error: (err) => {
  //           console.log(err);
  //           Swal.fire('Error', err.error.msg, 'error');
  //         }
  //       }
  //     )
  // }

  updateDoctorsList() {
    this.isLoading = true;
    this.doctorService.listDoctors()
      // .pipe(delay(100))
      .subscribe(
        {
          next: (doctorsResponse) => {
            this.doctors = doctorsResponse;
            this.doctorsTemp = doctorsResponse;
            this.isLoading = false
          }
        })
  }

  deleteDoctor(doctor: DoctorModel) {
    // console.log(hospital);

    Swal.fire({
      title: 'Are you sure?',
      html: `This action will delete the Doctor <b>${doctor.name}</b>. You won't be able to revert this!`,
      icon: 'question',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.delete(doctor.id)
          .subscribe(
            {
              next: (doctorResponse: any) => {
                console.log(doctorResponse);
                Swal.fire({
                  title: `Deleted!`,
                  html: `<b>${doctor.name} - ${doctorResponse.msg}</b>`,
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.updateDoctorsList();
              },
              error: (err) => {
                console.log(err);
                Swal.fire('Error', err.error.msg, 'error');
              }
            }
          )
      }
    })
  }

  openModal(doctor: DoctorModel) {
    this.modalService.showModal('doctor', doctor.id, doctor.image);
    // console.log(user);
  }

}
