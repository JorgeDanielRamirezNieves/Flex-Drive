import { Component, Input, OnInit } from '@angular/core';
import { Imagesvehicle, Vehicle } from '../../../features/vehicle/models/vehicle';

@Component({
  selector: 'app-vehiculo-card',
  standalone: false,
  templateUrl: './vehiculo-card.component.html',
  styleUrl: './vehiculo-card.component.css'
})
export class VehiculoCardComponent implements OnInit {
  @Input() public vehicle: Vehicle | undefined;
  public image: Imagesvehicle | undefined;
  public lastDigitPlate: string | undefined;
  @Input() public labelButton: string;
  public price:number
  constructor() {
    this.price = 0;
    this.labelButton = '';
    this.image = {
      thumbnailImageSrc: '',
      itemImageSrc: '',
      alt: '',
      title: '',
    };
    this.lastDigitPlate = '';
  }
  ngOnInit(): void {
    if (this.vehicle) {
      this.image = this.vehicle.image[0];
      this.lastDigitPlate = this.vehicle.plate.slice(-1);
      this.price = this.vehicle.prices?.length ? 
        this.vehicle.prices.reduce((latest, price) => {
          return new Date(price.endDate) > new Date(latest.endDate) ? price : latest;
        }).price : 0;
    }
  } 
}
