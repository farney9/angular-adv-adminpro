import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserModel } from '../../models/user.model';
import { UploadFileService } from '../../services/upload-file.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: UserModel;
  imageToUpload: File;
  imagePreview: any = null;

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private uploadFileService: UploadFileService) {
    this.user = userService.user;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });

  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateUserProfile(this.profileForm.value)
      .subscribe((resp: any) => {
        // console.log(resp);

        const {name, email} = resp.user;
        this.user.name = name;
        this.user.email = email

        Swal.fire('Saved', 'Profile was successfully updated', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
        console.log(err.error.msg);

      })
  }

  uploadImage() {
    this.uploadFileService.updatePhoto(this.imageToUpload,'usuario', this.user.uid)
    .then(imgPath => {
      this.user.image = imgPath
      Swal.fire('Saved', 'User image was successfully updated', 'success');
    }).catch( err => {
      Swal.fire('Error', err.error.msg, 'error');
      console.log(err.error.msg);
    } );
  }

  changeImage( file: File) {
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
