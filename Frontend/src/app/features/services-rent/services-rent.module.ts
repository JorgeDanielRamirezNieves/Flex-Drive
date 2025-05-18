import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRentalVehiclesComponent } from './components/card-rental-vehicles/card-rental-vehicles.component';
import { DetailsServiceComponent } from './components/details-service/details-service.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { SharedModule } from '../../shared/shared.module';
import { ServicesRentRoutingModule } from './services-rent-routing.module';



@NgModule({
  declarations: [
    CardRentalVehiclesComponent,
    DetailsServiceComponent,
    ViewAllComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServicesRentRoutingModule
  ]
})
export class ServicesRentModule { }
