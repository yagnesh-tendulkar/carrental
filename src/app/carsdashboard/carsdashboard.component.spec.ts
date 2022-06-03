import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsdashboardComponent } from './carsdashboard.component';

describe('CarsdashboardComponent', () => {
  let component: CarsdashboardComponent;
  let fixture: ComponentFixture<CarsdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
