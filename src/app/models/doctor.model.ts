
export interface DoctorUserModel {
  _id: string;
  name: string;
  image: string;
}
export interface DoctorHospitalModel {
  _id: string;
  name: string;
  image: string;
}


export class DoctorModel {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public user?: DoctorUserModel,
    public hospital?: DoctorHospitalModel
  ) { }
}