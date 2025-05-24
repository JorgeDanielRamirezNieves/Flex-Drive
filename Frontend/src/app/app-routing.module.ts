import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './features/landing/inicio/inicio.component';
import { AboutUsComponent } from './features/landing/about-us/about-us.component';
import { WhyUsComponent } from './features/landing/why-us/why-us.component';
import { ContactUsComponent } from './features/landing/contact-us/contact-us.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { LoginComponent } from './features/auth/components/login/login.component';
import { authenticatedGuard } from './features/auth/guards/authenticated.guard';
import { RegisterComponent } from './features/user/components/register/register.component';

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
    path: 'user/login',
    component: LoginComponent,
    canActivate: [authenticatedGuard],
  },
  {
    path: 'user/register',
    component: RegisterComponent,
    canActivate: [authenticatedGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
    canActivate: [authGuard],
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./features/vehicle/vehicle.module').then((m) => m.VehicleModule),
  },
  {
    path: 'requests',
    loadChildren: () =>
      import('./features/requests/requests.module').then(
        (m) => m.RequestsModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./features/services-rent/services-rent.module').then(
        (m) => m.ServicesRentModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./features/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [authGuard],
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
