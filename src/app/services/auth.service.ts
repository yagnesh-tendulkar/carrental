import { Injectable } from "@angular/core";
import { of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import * as CryptoJS from "crypto-js";

// import decode from 'jwt-decode';
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private route: Router) {}
  public getToken(): string {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImNyZWF0ZWRBdCI6IjIwMjItMDYtMTZUMTk6MTM6MDEuMDczWiIsImlhdCI6MTY1NjIzNDA1OSwiZXhwIjoxNjU2MzIwNDU5fQ.e9x5baDP229ymo-Oji3--AC_o61_4GFziFkenJd13Qg"
    try {
      if (localStorage.getItem("profile") == null) return undefined;
      // var deData = CryptoJS.AES.decrypt(decodeURIComponent(localStorage.getItem("profile")),'secret_profile_key');
      var deData = CryptoJS.AES.decrypt(
        decodeURIComponent(localStorage.getItem("profile")),
        "secret_profile_key"
      );
      console.log(deData)
      let decryptedInfo = JSON.parse(localStorage.getItem("profile"));

      return decryptedInfo.token;
    } catch (e) {
      console.log("clear from auth gettoken");
      localStorage.clear();
    }
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    // return tokenNotExpired(null, token);
    console.log(!!token);
    return !!token;
  }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // console.error("error", error);
      if (error.status == 401) {
        console.log("clear from 401");

        localStorage.clear();
        this.route.navigateByUrl("/");
      }
      return of(result as T);
    };
  }
}
