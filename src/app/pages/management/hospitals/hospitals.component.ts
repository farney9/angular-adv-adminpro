import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { HospitalModel } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  isLoading: boolean = true;
  hospitals: HospitalModel[] = [];


  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.updateHospitalsList();
  }

  updateHospitalsList() {
    this.isLoading = true;
    this.hospitalService.uploadHospital()
      .pipe( delay(500))
      .subscribe(
        {
          next: (hospitalsResponse) => {
            console.log(hospitalsResponse);
            this.hospitals = hospitalsResponse;
            this.isLoading = false
          }
        })
  }

}
