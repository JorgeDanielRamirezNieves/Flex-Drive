import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRentalVehiclesComponent } from './card-rental-vehicles.component';

describe('CardRentalVehiclesComponent', () => {
  let component: CardRentalVehiclesComponent;
  let fixture: ComponentFixture<CardRentalVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRentalVehiclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRentalVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
