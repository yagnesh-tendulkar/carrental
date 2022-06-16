import { Component, OnInit } from "@angular/core";
import { Routes, Router, ActivatedRoute } from "@angular/router"; // import {ApiserviceService}
import { UserService } from "../services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(public route: Router,
    private userService: UserService
    ) {}
  isCollapsed = false;

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }  
  ngOnInit() {
    console.log(this.route.url)
  }
  select(nav) {
    this.route.navigateByUrl("/" + nav);
    this.isCollapsed = false;
  }
  logout(){
    localStorage.clear();
    this.route.navigateByUrl("/home");

  }
}
