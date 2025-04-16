import Material from '@primeng/themes/material';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
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
