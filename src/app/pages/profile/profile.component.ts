import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;


  constructor( private fb: FormBuilder,
               private userService: UserService) { }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: ['123', Validators.required],
      email: ['abc', [Validators.required, Validators.email]],
    });

  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value)
      .subscribe(resp => {
        console.log(resp);

      })
  }

}
