import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { interval } from "rxjs";
import { UserService } from "../services/user.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  // registerForm: FormGroup;
  registerForm: FormGroup;
  otpVerify: true;
  SECONDS = 10;
  time = new Date(this.SECONDS * 1000).toISOString().substr(14, 5);
  submitted: boolean = false;
  isSpinning: boolean;
  source = interval(1000);
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        phoneNo: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        email: ["", Validators.required],
        otp: [""],
        password: ["", Validators.required],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
        agree: ["", Validators.required],
      },
      {
        validator: this.MustMatch("password", "confirmPassword"),
      }
    );
  }
  t = this.source.subscribe((val) => {
    console.log("interval running", this.time);
    this.SECONDS--;
    this.time = new Date(this.SECONDS * 1000).toISOString().substr(14, 5);
    if (this.SECONDS == 0) this.t.unsubscribe();
  });
  onSubmit() {
    console.log(this.registerForm.value);
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.userService
        .register({
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          password: this.registerForm.value.password,
          _id: this.registerForm.value.email,
          phoneNo: this.registerForm.value.phoneNo,
        })
        .subscribe((res) => {
          console.log(res);
          this.userService.encryptData(res)
          this.resend()
        });
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.isSpinning = false;
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  resend() {
    this.userService
      .generateOtp({ id: this.registerForm.value.email })
      .subscribe((res) => {
        console.log(res);
      });
  }
  verify() {
    this.userService
      .verifyOtp({ id: "test@gmail.com", otp: 630213 })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
