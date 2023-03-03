import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private hideModal: boolean = true;

  get hide() {
    return this.hideModal;
  }

  showModal() {
    this.hideModal = false;
  }

  closeModal() {
    this.hideModal = true;
  }

  constructor() { }
}
