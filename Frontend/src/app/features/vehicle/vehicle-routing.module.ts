import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosLandingComponent } from './components/vehiculos-landing/vehiculos-landing.component';
import { MyvehiclesComponent } from './components/myvehicles/myvehicles.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { DetalleVehiculoComponent } from './components/detalle-vehiculo/detalle-vehiculo.component';
import { authGuard } from '../auth/guards/auth.guard';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

const routes: Routes = [
  {
    path: 'start',
    component: VehiculosLandingComponent,
  },
  { path: 'myvehicles', component: MyvehiclesComponent, 
    canActivate: [authGuard],
   },
  { path: 'search', component: BusquedaComponent },
  { path: 'detail/:uuid', component: DetalleVehiculoComponent , 
    canActivate: [authGuard],
  },
  { path: 'createVehicle/:plate', component: VehicleFormComponent , 
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {}
