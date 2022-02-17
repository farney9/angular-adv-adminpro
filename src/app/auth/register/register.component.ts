import { Component,  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  
  registerForm = this.fb.group({
    name: ['Farney', Validators.required],
    email:  ['tategod772@bepureme.com', Validators.required],
    password:  ['123456', Validators.required],
    passwordConfirm:  ['123456', Validators.required],
    ischeckedTermsOfUse: [false, Validators.required]
  });

  constructor ( private readonly fb: FormBuilder, ) { }

  buildRegisterForm() {
    console.log(this.registerForm.value);
  }
}
