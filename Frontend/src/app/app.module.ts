import { CardRentalVehiclesComponent } from './components/layout/card-rental-vehicles/card-rental-vehicles.component';
/* config */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/* componentes primeng */
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
import { DrawerModule } from 'primeng/drawer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

/* componentes propios */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ErrorComponent } from './components/layout/error/error.component';
import { InicioComponent } from './components/landing/inicio/inicio.component';
import { WhyUsComponent } from './components/landing/why-us/why-us.component';
import { AboutUsComponent } from './components/landing/about-us/about-us.component';
import { ContactUsComponent } from './components/landing/contact-us/contact-us.component';
import { ButtonComponent } from './components/layout/button/button.component';
import { CardPequennaComponent } from './components/layout/card-pequenna/card-pequenna.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/user-pages/login/login.component';
import { RegisterComponent } from './components/user-pages/register/register.component';
import { InputLabelComponent } from './components/layout/input-label/input-label.component';
import { UserComponent } from './components/user-pages/user/user.component';
import { EditprofileComponent } from './components/user-pages/editprofile/editprofile.component';
import { MyvehiclesComponent } from './components/vehiculo/myvehicles/myvehicles.component';
import { RentalvehiclesComponent } from './components/servicios/rentalvehicles/rentalvehicles.component';
import { SubscriptionsComponent } from './components/user-pages/subscriptions/subscriptions.component';
import { ActivechatsComponent } from './components/user-pages/activechats/activechats.component';
import { ProfilesettingsComponent } from './components/user-pages/profilesettings/profilesettings.component';
import { MenuColumnComponent } from './components/layout/menu-column/menu-column.component';
import { SubscriptionsCardComponent } from './components/layout/subscriptions-card/subscriptions-card.component';
import { VehiculosLandingComponent } from './components/vehiculo/vehiculos-landing/vehiculos-landing.component';
import { BusquedaComponent } from './components/vehiculo/busqueda/busqueda.component';
import { VehiculoCardComponent } from './components/vehiculo/vehiculo-card/vehiculo-card.component';
import { DetalleVehiculoComponent } from './components/vehiculo/detalle-vehiculo/detalle-vehiculo.component';
import { CardSettingsComponent } from './components/layout/card-settings/card-settings.component';
import { ToggleButtonComponent } from './components/layout/toggle-button/toggle-button.component';
import { ColumnMessageComponent } from './components/layout/column-message/column-message.component';
import { ViewAllComponent } from './components/requests/view-all/view-all.component';
import { DetailsComponent } from './components/requests/details/details.component';
import { SuspenseComponent } from './components/layout/suspense/suspense.component';
import { PqrsComponent } from './components/user-pages/pqrs/pqrs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    InicioComponent,
    WhyUsComponent,
    AboutUsComponent,
    ContactUsComponent,
    ButtonComponent,
    CardPequennaComponent,
    LoginComponent,
    RegisterComponent,
    InputLabelComponent,
    UserComponent,
    EditprofileComponent,
    MyvehiclesComponent,
    RentalvehiclesComponent,
    SubscriptionsComponent,
    ActivechatsComponent,
    ProfilesettingsComponent,
    MenuColumnComponent,
    SubscriptionsCardComponent,
    VehiculosLandingComponent,
    BusquedaComponent,
    VehiculoCardComponent,
    DetalleVehiculoComponent,
    ViewAllComponent,
    DetailsComponent,
    SuspenseComponent,
    CardRentalVehiclesComponent,
    CardSettingsComponent,
    ToggleButtonComponent,
    ColumnMessageComponent,
    PqrsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DatePickerModule,
    SelectModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    CarouselModule,
    RatingModule,
    GalleriaModule,
    ToastModule,
    DrawerModule,
    ProgressSpinnerModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        options: {
          prefix: 'p',
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
