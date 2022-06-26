import { Component, OnInit } from "@angular/core";
import { CarsService } from "../services/cars.service";
import { UserService } from "../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.scss"],
})
export class CarsComponent implements OnInit {
  car: Object | any[];

  constructor(
    private userService: UserService,
    private carService: CarsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.carService.getCarsById(paramMap.get("id")).subscribe((res) => {
        console.log(res);
        this.car = res;
      });
    });
  }
}
