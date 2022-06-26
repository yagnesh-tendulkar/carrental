import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
@Component({
  selector: 'app-carsdashboard',
  templateUrl: './carsdashboard.component.html',
  styleUrls: ['./carsdashboard.component.scss']
})
export class CarsdashboardComponent implements OnInit {

  cars: Object | any[];
  constructor(private carService:CarsService) { }

  ngOnInit() {
    this.carService.getCars().subscribe(res=>{
      this.cars=res
    })
  }
  onSubmit(){
    
  }
}
