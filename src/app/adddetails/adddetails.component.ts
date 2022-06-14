import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { interval } from "rxjs";
import { UserService } from "../services/user.service";
@Component({
  selector: "app-adddetails",
  templateUrl: "./adddetails.component.html",
  styleUrls: ["./adddetails.component.scss"],
})
export class AdddetailsComponent implements OnInit {
  imgURL: string | ArrayBuffer;
  detailsForm: FormGroup;
  message: string;
  submitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  uploadFile(e, files, type) {
    let formData = new FormData();
    let selectedFiles = e.target.files;
    let currentFileUpload = selectedFiles.item(0);
    formData.append("file", currentFileUpload);

    formData.append("id", "test");
    formData.append("type", "test");

    formData.forEach((value, key) => {
      console.log("key", key + " " + value);
    });
    console.log(formData);
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  ngOnInit() {
    this.detailsForm = this.formBuilder.group(
      {
        model: ["", Validators.required],
        kilometers: ["", Validators.required],
        mileage: ["",Validators.required ],
        fueltype: ["", Validators.required],
        Seater: [""],
        garetype: ["", Validators.required],
        price:  ["", Validators.required],
        image:  [""],
      }
    );
  }

  onSubmit() {
   
  }

  onReset() {
    this.submitted = false;
    this.detailsForm.reset();
  }
  get f() {
    return this.detailsForm.controls;
  }
}
