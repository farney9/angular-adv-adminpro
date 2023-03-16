import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HospitalModel } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { ModalService } from '../../../services/modal.service';
import { SearchesService } from '../../../services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  isLoading: boolean = true;
  imageSubscription?: Subscription;
  hospitals: HospitalModel[] = [];
  hospitalsTemp: HospitalModel[] = [];



  constructor( private hospitalService: HospitalService,
               public modalService: ModalService,
               private searchesService: SearchesService) { }

  ngOnInit(): void {
    this.updateHospitalsList();
    this.imageSubscription =  this.modalService.newImageEvent
    .pipe( delay(100))
    .subscribe( img =>  this.updateHospitalsList() );
  }

  searchByTerm(term: string) {
    if (term.length === 0) {
      return this.hospitals = this.hospitalsTemp;
    }

    this.searchesService.search('hospital', term)
      .subscribe({
        next: (response: HospitalModel[]) => {
          this.hospitals = response 
        }
      })
  }

  updateHospitalsList() {
    this.isLoading = true;
    this.hospitalService.uploadHospital()
      // .pipe(delay(100))
      .subscribe(
        {
          next: (hospitalsResponse) => {
            this.hospitals = hospitalsResponse;
            this.hospitalsTemp = hospitalsResponse;
            this.isLoading = false
          }
        })
  }

  async openSweetAlertAddNew() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Add new Hospital',
      input: 'text',
      html: '<b>Hospital Name</b>',
      inputPlaceholder: 'Enter the Hospital Name',
      showCancelButton: true,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write some hospital name!'
        }
      }
    })

    if (value.trim().length > 0) {
      this.addHospital(value);
    }
  }

  addHospital(hospitalName: string) {
    // console.log(hospital);
    this.hospitalService.add(hospitalName)
      .subscribe(
        {
          next: (hospitalResponse) => {
            Swal.fire({
              title: 'Added!',
              html: `<b>${hospitalResponse.name}</b>`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
            this.updateHospitalsList();
          },
          error: (err) => {
            console.log(err);
          Swal.fire('Error', err.error.msg,'error');
          }
        }
      )
  }
  editHospital(hospital: HospitalModel) {
    // console.log(hospital);

    this.hospitalService.edit(hospital.id, hospital.name)
      .subscribe(
        {
          next: (hospitalResponse) => {
            console.log(hospitalResponse);
            Swal.fire({
              title: 'Updated',
              html: `<b>${hospitalResponse.name}</b>`,
              icon: 'success'
            });
          },
          error: (err) => {
            console.log(err);
          Swal.fire('Error', err.error.msg,'error');
          }
        }
      )
  }

  deleteHospital(hospital: HospitalModel) {
    // console.log(hospital);

    this.hospitalService.delete(hospital.id)
      .subscribe(
        {
          next: (hospitalResponse: any) => {
            console.log(hospitalResponse);
            Swal.fire({
              title: `${hospital.name}`,
              html: `<b>${hospitalResponse.msg}</b>`,
              icon: 'success'
            });
            this.updateHospitalsList();
          },
          error: (err) => {
            console.log(err);
          Swal.fire('Error', err.error.msg,'error');
          }
        }
      )
  }

  openModal(hospital: HospitalModel) {
    this.modalService.showModal('hospital', hospital.id, hospital.image);
    // console.log(user);
  }



}
