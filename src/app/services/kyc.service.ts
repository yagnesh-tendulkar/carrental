import { Injectable } from '@angular/core';
import { of, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthService } from "../services/auth.service";
@Injectable({
  providedIn: 'root'
})
export class KycService {
  constructor(private http: HttpClient, private interceptor: AuthService) {
  
  }
  getFiles() {
    return this.http
      .get(`${environment.hostURL}api/users`)
      .pipe(catchError(this.interceptor.handleError("", [])));
  }

  uploadFile(data) {
    return this.http.post(environment.hostURL + "api/file", data);

  }
  saveData(data) {
    return this.http.post(environment.hostURL + "api/kyc", data);

  }
}
