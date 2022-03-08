import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
import { UserRegisterRequest } from '../models/request-user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //formato para email válido
  emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  isFormSubmited: boolean = false;
  registerForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService) {
    this.registerForm = this.fb.group({
      name: new FormControl('a', Validators.required),
      email: new FormControl('a@b.com', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('123456', Validators.required),
      isCheckedTermsOfUse: new FormControl(null, Validators.required)
    },
      {
        validators: this.mustMatch('password', 'passwordConfirm')
      })
  }

  // funcion f para tener accesso a los controles y sus propiedades desde el HTML
  get f() { return this.registerForm.controls }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  onSubmit() {
    this.isFormSubmited = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // POST user
    const request: UserRegisterRequest = {
      name: this.registerForm.controls.name.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value
    }

    this.userService.add(request).subscribe(
      (res) => {
        console.log('usuario creado');
        console.log(res);
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
