import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';
import { ModalService } from '../../services/modal.service';
import { UploadFileService } from '../../services/upload-file.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {
  imageToUpload: File;
  imagePreview: any = null;


  constructor( public modalService: ModalService,
               public uploadFileService: UploadFileService,
               private userService: UserService) {
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

  uploadImage() {
    const id = this.modalService.id;
    const userType = this.modalService.userType;

    this.uploadFileService.updatePhoto(this.imageToUpload, userType, id)
    .then(imgPath => {
      // Swal.fire('Saved', 'User image was successfully updated', 'success');
      this.modalService.newImageEvent.emit(imgPath)
      this.closeModal();
    }).catch( err => {
      Swal.fire('Error', err.error.msg, 'error');
      console.log(err.error.msg);
    } );
  }

}
