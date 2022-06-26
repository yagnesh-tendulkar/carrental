import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { of, throwError } from 'rxjs';

import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, public userService: UserService, private route: Router) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/login') || request.url.includes('/register') || request.url.includes('/otp')) {      
      console.log("request", request)
      return next.handle(request);

    }
    console.log("request", request)

    if (request['status'] == 401) {
      console.log("clear from token 401")
      localStorage.clear();
      this.route.navigateByUrl('/')
    }
    if (this.auth.isAuthenticated) {
      this.userService.isLoggedin = true
      if( this.userService.decryptData())
      this.userService.role = this.userService.decryptData().role
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
      return next.handle(request);
    } else {
      console.log("clear from token 401 else")

      localStorage.clear();
      this.route.navigateByUrl('/')
    }
  }
}
