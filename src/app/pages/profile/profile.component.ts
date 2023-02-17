import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: UserModel;

  constructor( private fb: FormBuilder,
               private userService: UserService) {
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
    this.userService.updateUser(this.profileForm.value)
      .subscribe((resp: any) => {
        // console.log(resp);

        const {name, email} = resp.user;
        this.user.name = name;
        this.user.email = email
      })
  }

}
