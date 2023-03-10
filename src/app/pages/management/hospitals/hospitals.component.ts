import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  isLoading: boolean = true;


  constructor( private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.updateHospitalsList();
  }

  updateHospitalsList() {
    this.isLoading = true;
    this.hospitalService.uploadHospital()
    .subscribe(hospitalsResponse => {
      console.log(hospitalsResponse);

    })
  }

}
