import { Injectable } from "@angular/core";
import { of, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthService } from "../services/auth.service";

import { Observable } from "rxjs";
import * as CryptoJS from "crypto-js";
@Injectable({
  providedIn: "root",
})
export class UserService {
  public secretKey;
  isLoggedin = false;
  constructor(private http: HttpClient, private interceptor: AuthService) {
    if (localStorage.getItem("profile")) this.role = this.decryptData().role;
  }
  role;

  getAgentList() {
    return this.http
      .get(`${environment.hostURL}api/users`)
      .pipe(catchError(this.interceptor.handleError("", [])));
  }

  login(data) {
    return this.http.post(environment.hostURL + "login", data);

  }

  register(data) {
    return this.http
      .post(environment.hostURL + "register", data)
      .pipe(
        tap((group) => console.log("add user")),
        catchError(this.interceptor.handleError("", []))
      );
  }
  removeUser(id) {
    return this.http.delete(`${environment.hostURL}api/users/` + id).pipe(
      tap((group) => console.log("remove user")),
      catchError(this.interceptor.handleError("", []))
    );
  }

  generatePassword() {
    return this.http
      .get(`${environment.hostURL}api/users/password/generate`)
      .pipe(
        tap((group) => console.log("generate password")),
        catchError(this.interceptor.handleError("getAgentList", []))
      );
  }

  resetPassword(data) {
    return this.http
      .post(environment.hostURL + "api/users/password/reset", data)
      .pipe(
        tap((group) => console.log("password reset")),
        catchError(this.interceptor.handleError("getAgentList", []))
      );
  }

  changePassword(data) {
    return this.http
      .post(environment.hostURL + "api/users/password/change", data)
      .pipe(
        tap((group) => console.log("password change")),
        catchError(this.interceptor.handleError("getAgentList", []))
      );
  }

  generateOtp(data) {
    return this.http
      .post(environment.hostURL + "otp/generate", data)
      .pipe(
        tap((group) => console.log("password change")),
        catchError(this.interceptor.handleError("getAgentList", []))
      );
  }

  verifyOtp(data) {
    return this.http
      .post(environment.hostURL + "otp/verify", data)
      .pipe(
        tap((group) => console.log("password change")),
        catchError(this.interceptor.handleError("getAgentList", []))
      );
  }
  

  getSecretKey() {
    this.http.get(environment.hostURL + "secretkey").subscribe((res: any) => {
      this.secretKey = res.key;
    });
  }

  encryptData(data: any) {
    let encryptInfo = CryptoJS.AES.encrypt(JSON.stringify(data),'secret_profile_key');
    console.log(encryptInfo)
    localStorage.setItem("profile", (encryptInfo));
  }
  decryptData() {
    try {
      if (localStorage.getItem("profile") == null) return undefined;
      var deData = CryptoJS.AES.decrypt(localStorage.getItem("profile"),'secret_profile_key').toString(CryptoJS.enc.Utf8);
      console.log("deData",JSON.parse(deData))

      return JSON.parse(deData);
    } catch (e) {
      console.log("clear from decrypt");
      localStorage.clear();
      return null
    }
  }


}
