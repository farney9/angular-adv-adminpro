import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private hideModal: boolean = true;
  userType: 'usuario'|'doctor'|'hospital';
  id: string;
  image: string;

  newImageEvent: EventEmitter<string>  = new EventEmitter<string>();

  get hide() {
    return this.hideModal;
  }

  showModal(userType: 'usuario'|'doctor'|'hospital', id: string, image: string = 'noimage') {
    this.hideModal = false;
    this.userType = userType;
    this.id = id;

    const url = `${apiUrl}/uploads/${userType}/${image}`;

    if (image.includes('https')) {
      this.image = image;
    } else {
      this.image = url;
    }


  }

  closeModal() {
    this.hideModal = true;
  }

  constructor() { }
}
