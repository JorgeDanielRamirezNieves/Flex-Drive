import { Price } from '../../../vehicle/models/price';
import { Imagesvehicle } from '../../../vehicle/models/vehicle';
import { Service } from './../../models/service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-rental-vehicles',
  standalone: false,
  templateUrl: './card-rental-vehicles.component.html',
  styleUrl: './card-rental-vehicles.component.css',
})
export class CardRentalVehiclesComponent {
  @Input() service: Service | undefined;
  public image: Imagesvehicle | undefined;
  public price: number;
  constructor() {
    this.price = 0;
    this.image = {
      thumbnailImageSrc: '',
      itemImageSrc: '',
      alt: '',
      title: '',
    };
  }
  ngOnInit(): void {
    if (this.service?.request?.requestVehicle) {
      this.image = this.service.request.requestVehicle.image[0];
    }
    this.price = this.service?.request?.requestVehicle?.prices?.length ? 
        this.service?.request?.requestVehicle?.prices.reduce((latest, price) => {
          return new Date(price.endDate) > new Date(latest.endDate) ? price : latest;
        }).price : 0;

  }
}
