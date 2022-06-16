import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { interval } from "rxjs";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  isSpinning: boolean;
  isValid: boolean;
  source = interval(1000);
  
  SECONDS = 30;
  time = new Date(this.SECONDS * 1000).toISOString().substr(14, 5);
  t: any;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private loginService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      otp: [""],
      agree: [""],
    });
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
    this.loginService
      .login({
        password: this.loginForm.value.password, //"qwerty123",
        email: this.loginForm.value.email, //"test@gmail.com"
      })
      .subscribe((res) => {
        console.log(res);
        this.loginService.encryptData(res);
        this.isValid=true;
      });
    this.submitted = true;
  }

  onSubmitOtp(){
    this.loginService
      .generateOtp({ id: this.loginForm.value.email })
      .subscribe((res) => {
        console.log(res);
        this.t= this.source.subscribe((val) => {
          console.log("interval running", this.time);
          this.SECONDS--;
          this.time = new Date(this.SECONDS * 1000).toISOString().substr(14, 5);
          if (this.SECONDS == 0) this.t.unsubscribe();
        });
      });
  }
  
  resend() {
    this.SECONDS=120;
    this.loginService
      .generateOtp({ id: this.loginForm.value.email })
      .subscribe((res) => {
        console.log(res);
        this.t= this.source.subscribe((val) => {
          console.log("interval running", this.time);
          this.SECONDS--;
          this.time = new Date(this.SECONDS * 1000).toISOString().substr(14, 5);
          if (this.SECONDS == 0) this.t.unsubscribe();
        });
      });
  }
  verify() {
    this.loginService
      .verifyOtp({ id: this.loginForm.value.email, otp: this.loginForm.value.otp })
      .subscribe((res) => {
        console.log(res);
        if(res){
          this.router.navigateByUrl('/')
          this.loginService.isLoggedin=true
        }
      });
  }
}
