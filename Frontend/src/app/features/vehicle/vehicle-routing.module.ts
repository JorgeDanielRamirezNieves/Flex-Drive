import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosLandingComponent } from './components/vehiculos-landing/vehiculos-landing.component';
import { MyvehiclesComponent } from './components/myvehicles/myvehicles.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { DetalleVehiculoComponent } from './components/detalle-vehiculo/detalle-vehiculo.component';

const routes: Routes = [
  {
    path: 'start',
    component: VehiculosLandingComponent,
  },
  { path: 'myvehicles', component: MyvehiclesComponent },
  { path: 'search', component: BusquedaComponent },
  { path: 'detail', component: DetalleVehiculoComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {}
