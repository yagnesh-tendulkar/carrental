import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted: boolean;
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group(
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
        message: [""],
      }
    );
  }
  get f() {
    return this.contactForm.controls;
  }
  onReset() {
    this.submitted = false;
    this.contactForm.reset();
  }
  onSubmit() {
    console.log(this.contactForm.value);
    this.submitted = true;
  }
}
