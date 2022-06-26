import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { KycComponent } from './kyc/kyc.component';
import { CarsdashboardComponent } from './carsdashboard/carsdashboard.component';
import { AdddetailsComponent } from './adddetails/adddetails.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './services/token.interceptor';
import { SearchPipe } from './search.pipe';
import { CarsComponent } from './cars/cars.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    KycComponent,
    CarsdashboardComponent,
    AdddetailsComponent,
    UserComponent,
    SearchPipe,
    CarsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginComponent, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
