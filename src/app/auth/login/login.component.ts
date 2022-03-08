import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { UserLoginRequest } from '../models/request-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  isFormSubmited: boolean = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly userService: UserService) {
    this.loginForm = this.fb.group({
      email: new FormControl('a@b.com', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
      isCheckedRememberme: new FormControl(false)
    })
  }

  // funcion f para tener accesso a los controles y sus propiedades desde el HTML
  get f() { return this.loginForm.controls }

  login() {
    this.isFormSubmited = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    // Login
    const request: UserLoginRequest = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
      isCheckedRememberme: this.loginForm.controls.isCheckedRememberme.value
    }

    this.userService.login(request).subscribe(
      (resp) => {
        console.log(resp);
        // this.router.navigateByUrl('/');

      },
      (err) => {
        // si hay error
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error'
        })
      }
    )

  }

}
