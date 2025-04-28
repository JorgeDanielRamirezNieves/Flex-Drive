import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/landing/inicio/inicio.component';
import { AboutUsComponent } from './components/landing/about-us/about-us.component';
import { WhyUsComponent } from './components/landing/why-us/why-us.component';
import { ContactUsComponent } from './components/landing/contact-us/contact-us.component';
import { ErrorComponent } from './components/layout/error/error.component';
import { LoginComponent } from './components/user-pages/login/login.component';
import { RegisterComponent } from './components/user-pages/register/register.component';
import { UserComponent } from './components/user-pages/user/user.component';
import { EditprofileComponent } from './components/user-pages/editprofile/editprofile.component';
import { ProfilesettingsComponent } from './components/user-pages/profilesettings/profilesettings.component';
import { MyvehiclesComponent } from './components/user-pages/myvehicles/myvehicles.component';
import { RentalvehiclesComponent } from './components/user-pages/rentalvehicles/rentalvehicles.component';
import { SubscriptionsComponent } from './components/user-pages/subscriptions/subscriptions.component';
import { ActivechatsComponent } from './components/user-pages/activechats/activechats.component';
import { VehiculosLandingComponent } from './components/vehiculo/vehiculos-landing/vehiculos-landing.component';
import { DetalleVehiculoComponent } from './components/vehiculo/detalle-vehiculo/detalle-vehiculo.component';
import { BusquedaComponent } from './components/vehiculo/busqueda/busqueda.component';

const routes: Routes = [
  {
    path: 'landing',
    children: [
      { path: 'aboutUs', component: AboutUsComponent },
      { path: 'whyUs', component: WhyUsComponent },
      { path: 'contactUs', component: ContactUsComponent },
      { path: '', component: InicioComponent },
    ],
  },
  {
    path: 'user',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'editprofile', component: EditprofileComponent },
      { path: 'myvehicles', component: MyvehiclesComponent },
      { path: 'rentalvehicles', component: RentalvehiclesComponent },
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'activechats', component: ActivechatsComponent },
      { path: 'profilesettings', component: ProfilesettingsComponent },
      { path: '', component: UserComponent },
    ],
  },
  {
    path: 'vehicles',
    children: [
      { path: 'start', component: VehiculosLandingComponent },
      { path: 'detail', component: DetalleVehiculoComponent },
      { path: 'search', component: BusquedaComponent },
    ],
  },
  /* rutas obligatorios */
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
