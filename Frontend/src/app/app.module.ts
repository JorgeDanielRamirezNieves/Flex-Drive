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
import { ButtonSimpleComponent } from './components/layout/button-simple/button-simple.component';
import { RegisterComponent } from './components/user-pages/register/register.component';
import { InputLabelComponent } from './components/layout/input-label/input-label.component';
import { UserComponent } from './components/user-pages/user/user.component';
import { EditprofileComponent } from './components/user-pages/editprofile/editprofile.component';
import { MyvehiclesComponent } from './components/user-pages/myvehicles/myvehicles.component';
import { RentalvehiclesComponent } from './components/user-pages/rentalvehicles/rentalvehicles.component';
import { SubscriptionsComponent } from './components/user-pages/subscriptions/subscriptions.component';
import { ActivechatsComponent } from './components/user-pages/activechats/activechats.component';
import { ProfilesettingsComponent } from './components/user-pages/profilesettings/profilesettings.component';
import { MenuColumnComponent } from './components/layout/menu-column/menu-column.component';
import { SubscriptionsCardComponent } from './components/layout/subscriptions-card/subscriptions-card.component';

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
    ButtonSimpleComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DatePickerModule,
    SelectModule,
    AccordionModule,
    ButtonModule,
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
