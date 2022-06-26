import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ContactComponent } from "./contact/contact.component";
import { KycComponent } from "./kyc/kyc.component";
import { CarsdashboardComponent } from "./carsdashboard/carsdashboard.component";
import { AdddetailsComponent } from "./adddetails/adddetails.component";
import { UserComponent } from "./user/user.component";
import { CarsComponent } from "./cars/cars.component";
const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    pathMatch: "full",
    path: "",
    component: HomeComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "kyc",
    component: KycComponent,
  },
  {
    path: "dashboard",
    component: CarsdashboardComponent,
  },
  {
    path: "car/:action/:carId",
    component: AdddetailsComponent,
  },
  {
    path: "users",
    component: UserComponent,
  },
  
  {
    path: "car/:id",
    component: CarsComponent,
  },

  

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
