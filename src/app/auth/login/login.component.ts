import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { UserLoginRequest } from '../models/request-user.model';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef;

  emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  isFormSubmited: boolean = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private readonly fb: FormBuilder,
    private readonly userService: UserService) {
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      isCheckedRememberme: [localStorage.getItem('email') || null],
    })
  }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "646045301133-u7tdr38u7lmrfgq1ivr97f7721cebjd3.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.userService.loginGoogle(response.credential)
      .subscribe(resp => {
        console.log({login: resp});
        this.router.navigateByUrl('/');

      })
  }

 

  ngOnInit(): void {
    this.loginForm.get('isCheckedRememberme').value;
  }

  // funcion f para tener accesso a los controles y sus propiedades desde el HTML
  get f() { return this.loginForm.controls }

  login() {
    this.isFormSubmited = true;
    // console.log(this.loginForm.value);

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

        if (this.loginForm.get('isCheckedRememberme').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem('isCheckedRememberme', this.loginForm.get('isCheckedRememberme').value);
        } else {
          localStorage.removeItem('email')
          localStorage.removeItem('isCheckedRememberme')
        }
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
