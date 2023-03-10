
export interface HospitalUserModel{
  _id: string;
  name: string;
  image: string;
}

export class HospitalModel {


  constructor( public name: string,
               public _id: string,
               public image?: string,
               public user?: HospitalUserModel,
               ) {

  }
}