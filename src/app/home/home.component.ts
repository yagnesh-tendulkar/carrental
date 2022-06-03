import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from "@angular/router"; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) {}

  ngOnInit() {
  }
navigate(){
  this.route.navigateByUrl("/dashboard");
}
}
