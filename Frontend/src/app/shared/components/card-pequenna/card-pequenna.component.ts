import { Price } from '../../../features/vehicle/models/price';
import { Vehicle } from './../../../features/vehicle/models/vehicle';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-pequenna',
  standalone: false,
  templateUrl: './card-pequenna.component.html',
  styleUrl: './card-pequenna.component.css',
})
export class CardPequennaComponent {
  @Input() public Vehicle: Vehicle;
  public prices: Price[] | undefined;
  public price: Price | undefined;
  
  constructor() {
    this.Vehicle = new Vehicle(
      '',
      '',
      '',
      '',
      'in_use',
      '',
      '',
      0,
      '',
      [],
      0,
      0,
      [],
      '',
      0,
      false,
      new Date(),
      new Date(),
      '',
      ''
    );
    
  }
  
  ngOnInit(): void {
  this.prices = this.Vehicle.prices;
  if (this.prices && this.prices.length > 0) {
    this.price = this.prices.reduce((prev, current) => {
      return new Date(prev.endDate) > new Date(current.endDate) ? prev : current;
    }, this.prices[0]);
  }  
  console.log(this.Vehicle);
  
}
}
