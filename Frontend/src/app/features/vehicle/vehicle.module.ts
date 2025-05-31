import { VehiculoCardComponent } from '../../shared/components/vehiculo-card/vehiculo-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { DetalleVehiculoComponent } from './components/detalle-vehiculo/detalle-vehiculo.component';
import { MyvehiclesComponent } from './components/myvehicles/myvehicles.component';
import { VehiculosLandingComponent } from './components/vehiculos-landing/vehiculos-landing.component';
import { SharedModule } from '../../shared/shared.module';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';



@NgModule({
  declarations: [
    BusquedaComponent,
    DetalleVehiculoComponent,
    MyvehiclesComponent,
    VehiculosLandingComponent,
    VehicleFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehicleRoutingModule
  ]
})
export class VehicleModule { }
