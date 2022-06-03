import { Component, OnInit } from "@angular/core";
import { Routes, Router, ActivatedRoute } from "@angular/router"; // import {ApiserviceService}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(public route: Router) {}

  ngOnInit() {
    console.log(this.route.url)
  }
  select(nav) {
    this.route.navigateByUrl("/" + nav);
  }
}
