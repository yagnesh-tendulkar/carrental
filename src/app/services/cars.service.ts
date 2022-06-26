import { Injectable } from '@angular/core';
import { of, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient, private interceptor: AuthService) {
  
  }
  getCarsById(id) {
    return this.http
      .get(`${environment.hostURL}api/car/`+id)
      .pipe(catchError(this.interceptor.handleError("", [])));
  }
  getCars() {
    return this.http
      .get(`${environment.hostURL}api/car`)
      .pipe(catchError(this.interceptor.handleError("", [])));
  }
  addCar(data) {
    return this.http.post(environment.hostURL + "api/car", data);

  }
  updateCar(data) {
    return this.http.post(environment.hostURL + "api/car", data);

  }
}