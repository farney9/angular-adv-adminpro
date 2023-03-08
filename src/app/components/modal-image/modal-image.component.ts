import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {
  imageToUpload: File;
  imagePreview: any = null;


  constructor(public modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.closeModal();
    this.imagePreview = null;
  }

  changeImage(file: File) {
    this.imageToUpload = file;
    if (!file) {
      return this.imagePreview = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagePreview = reader.result;
    }
  }

}
