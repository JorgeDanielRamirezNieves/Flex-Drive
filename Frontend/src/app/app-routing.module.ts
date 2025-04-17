import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/landing/inicio/inicio.component';
import { AboutUsComponent } from './components/landing/about-us/about-us.component';
import { WhyUsComponent } from './components/landing/why-us/why-us.component';
import { ContactUsComponent } from './components/landing/contact-us/contact-us.component';
import { ErrorComponent } from './components/layout/error/error.component';

const routes: Routes = [
  {
    path: 'landing', children: [
      {path: 'aboutUs', component: AboutUsComponent},
      {path: 'whyUs', component: WhyUsComponent},
      {path: 'contactUs', component: ContactUsComponent},
      /* rutas obligatorios */
      {path: '', component: InicioComponent},
    ] 
  },
  /* rutas obligatorios */
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
