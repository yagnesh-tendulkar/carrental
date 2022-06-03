import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  isSpinning: boolean;
  isValid: boolean;
  constructor(private formBuilder: FormBuilder,private loginService:UserService ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group(
      {
        email: ["", Validators.required],
        password: ["", Validators.required],
        otp:["", Validators.required]
      })

    this.loginService.login({
      "password": "qwerty123",
      "email": "test@gmail.com"
  }).subscribe((res)=>{
      console.log(res)
      this.loginService.encryptData(res)
    })
  }
  get f() {
    return this.loginForm.controls;
  }
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
    this.isSpinning = false;
  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.submitted = true;
  }
}
