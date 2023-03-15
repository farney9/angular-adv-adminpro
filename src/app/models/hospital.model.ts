
export interface HospitalUserModel{
  _id: string;
  name: string;
  image: string;
}

export class HospitalModel {


  constructor( public id: string,
               public name: string,
               public image?: string,
               public user?: HospitalUserModel,
               ) {

  }
}