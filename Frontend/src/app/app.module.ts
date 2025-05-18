/* config */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


/* componentes propios */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { InicioComponent } from './features/landing/inicio/inicio.component';
import { WhyUsComponent } from './features/landing/why-us/why-us.component';
import { AboutUsComponent } from './features/landing/about-us/about-us.component';
import { SharedModule } from './shared/shared.module';
import { ContactUsComponent } from './features/landing/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    WhyUsComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
