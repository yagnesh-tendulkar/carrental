import { Component, OnInit } from '@angular/core';
import { KycService } from '../services/kyc.service';
@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {
  aadharimgURL: string | ArrayBuffer;
  dlimgURL: string | ArrayBuffer;
  public imagePath;
  panimgURL: any;
  public message: string;
  imgURL: string | ArrayBuffer;
  constructor(public service:KycService) { }

  ngOnInit() {
  }

 
  preview(files,type) {

  }
  uploadFile(e,files,type){
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
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    console.log(this.imgURL,type)
    if (type == "aadhar") this.aadharimgURL = this.imgURL;
    if (type == "pan") this.panimgURL = this.imgURL;
    if (type == "dl") this.dlimgURL = this.imgURL;
  }
  }
