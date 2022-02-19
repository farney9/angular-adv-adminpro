import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private readonly fb: FormBuilder,) {
    this.registerForm = this.fb.group({
      name:                new FormControl('a', Validators.required),
      email:               new FormControl('a@b.com', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
      password:            new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordConfirm:     new FormControl(null, Validators.required),
      isCheckedTermsOfUse: new FormControl(null, Validators.required)
    },
    {
       validators: this.mustMatch('password', 'passwordConfirm')
    })
  }

  // funcion f para tener accesso a los controles y sus propiedades desde el HTML
  get f() { return this.registerForm.controls }

  mustMatch(controlName: string, matchingControlName: string) {
    return(formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return
      }

      if (control.value !== matchingControl.value ) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  onSubmit() {
    this.isFormSubmited = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('posteando formulario');
    } else {
      console.log('formulario no es válido');

    }
  }
}
