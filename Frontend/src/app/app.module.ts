import Material from '@primeng/themes/material';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ErrorComponent } from './components/layout/error/error.component';
import { InicioComponent } from './components/landing/inicio/inicio.component';
import { WhyUsComponent } from './components/landing/why-us/why-us.component';
import { AboutUsComponent } from './components/landing/about-us/about-us.component';
import { ContactUsComponent } from './components/landing/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    InicioComponent,
    WhyUsComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
      provideHttpClient(withInterceptorsFromDi()),
      MessageService,
      provideAnimationsAsync(),
          providePrimeNG({
            theme: {
              preset: Material,
              options: {
                  prefix: 'p',
                  darkModeSelector: false,
                  cssLayer: false
              }
          }
          })
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
