import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorModel } from '../../../models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { ModalService } from '../../../services/modal.service';
import { SearchesService } from '../../../services/searches.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  isLoading: boolean = true;
  imageSubscription?: Subscription;
  doctors: DoctorModel[] = [];
  doctorsTemp: DoctorModel[] = [];

  constructor(
    private doctorService: DoctorService,
    private searchesService: SearchesService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.updateDoctorsList();
    console.log(this.doctors);

  }

  openModal(doctor: DoctorModel) {
    this.modalService.showModal('doctor', doctor.id, doctor.image);
    // console.log(user);
  }

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

}
