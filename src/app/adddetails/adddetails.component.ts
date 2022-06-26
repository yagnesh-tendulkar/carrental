import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { interval } from "rxjs";
import { UserService } from "../services/user.service";
import { CarsService } from "../services/cars.service";
import { ActivatedRoute } from "@angular/router";
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
  car: any;
  id=null
  action=null;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private carService: CarsService,

    public route: ActivatedRoute
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
    console.log(this.userService.decryptData().email)
    this.detailsForm = this.formBuilder.group(
      {

        model: ["", Validators.required],
        kilometers: ["", Validators.required],
        mileage: ["", Validators.required],
        fueltype: ["", Validators.required],
        Seater: [""],
        garetype: ["", Validators.required],
        price: ["", Validators.required],
        image: [null],
      }
      )
    this.route.paramMap.subscribe((paramMap) => {
      this.action=paramMap.get("action")
      this.id=paramMap.get("carId")

      console.log(paramMap.get("carId"), paramMap.get("action"));
      // this.carService.getCarsById(paramMap.get("cardId")).subscribe((res) => {
      //   console.log(res);
      //   this.car = res;
      // });
    });
    if(this.action=='add'){
    this.detailsForm = this.formBuilder.group(
      {

        model: ["", Validators.required],
        kilometers: ["", Validators.required],
        mileage: ["", Validators.required],
        fueltype: ["", Validators.required],
        Seater: [""],
        garetype: ["", Validators.required],
        price: ["", Validators.required],
        image: [null],
      });
    }
    else{
         this.carService.getCarsById(this.id).subscribe((res:any) => {
        console.log(res);
        this.car = res;
        this.detailsForm = this.formBuilder.group(
          {
    
            model: [res.model, Validators.required],
            kilometers: [res.kilometers, Validators.required],
            mileage: [res.mileage, Validators.required],
            fueltype: [res.fueltype, Validators.required],
            Seater: [res.seater],
            garetype: [res.garetype, Validators.required],
            price: [res.price, Validators.required],
            image: [null],
          });
      });
    }
  }

  onSubmit() {
    
    let data= this.detailsForm.value
    data["userId"]=this.userService.decryptData().email
    console.log(data)
    this.carService.addCar(data).subscribe((res)=>{

    })
  }

  onReset() {
    this.submitted = false;
    this.detailsForm.reset();
  }
  get f() {
    return this.detailsForm.controls;
  }
}
