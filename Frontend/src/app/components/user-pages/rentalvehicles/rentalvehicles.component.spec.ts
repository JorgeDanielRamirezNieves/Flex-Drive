import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalvehiclesComponent } from './rentalvehicles.component';

describe('RentalvehiclesComponent', () => {
  let component: RentalvehiclesComponent;
  let fixture: ComponentFixture<RentalvehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalvehiclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalvehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
