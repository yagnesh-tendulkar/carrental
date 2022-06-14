import { Component, OnInit } from "@angular/core";
import { KycService } from "../services/kyc.service";
import { UserService } from "../services/user.service";
@Component({
  selector: "app-kyc",
  templateUrl: "./kyc.component.html",
  styleUrls: ["./kyc.component.scss"],
})
export class KycComponent implements OnInit {
  aadharimgURL: string | ArrayBuffer=null;
  dlimgURL: string | ArrayBuffer=null;
  public imagePath;
  panimgURL: string | ArrayBuffer=null;
  public message: string;
  imgURL: string | ArrayBuffer;
  imgeBaseUrl = "http://localhost:9000/v1/file/";
  loader = false;
  aLoader: boolean = false;
  ploader: boolean = false;
  dloader: boolean = false;
  user={}
  constructor(public service: KycService, public userService:UserService) {}

  ngOnInit() {
    console.log(this.userService.decryptData().email)
    // this.user["id"]=this.userService.decryptData().id
  }

  preview(files, type) {}
  uploadFile(e, files, type) {
    if (type == "aadhar") this.aLoader = true;
    if (type == "pan") this.ploader = true;
    if (type == "dl") this.dloader = true;
    let formData = new FormData();
    let selectedFiles = e.target.files;
    let currentFileUpload = selectedFiles.item(0);
    formData.append("file", currentFileUpload);
    console.log(this.aadharimgURL, type);

    formData.append("id", "yagnesh");
    formData.append("type", "aadhar");

    formData.forEach((value, key) => {
      console.log("key", key + " " + value);
    });

    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    console.log(formData);
    this.service.uploadFile(formData).subscribe((res: any) => {
      if (type == "aadhar") this.aadharimgURL = this.imgeBaseUrl + res.fileId;
      if (type == "pan") this.panimgURL = this.imgeBaseUrl + res.fileId;
      if (type == "dl") this.dlimgURL = this.imgeBaseUrl + res.fileId;
      console.log(res);
      setTimeout(() => {
        if (type == "aadhar") this.aLoader = false;
        if (type == "pan") this.ploader = false;
        if (type == "dl") this.dloader = false;
      }, 5000);
    });
  }

  onSubmit(){
    let data={
      userId: this.userService.decryptData().email,
      aadhar: {
        url: this.aadharimgURL,
        verified: false
      },
      licence: {
          url: this.dlimgURL,
          verified: false
      },
      profile: {
        url: this.panimgURL,
        verified: false
      }
    }
    console.log(data)
    this.service.saveData(data).subscribe((res)=>{
      console.log(res)
    })
  }
}
