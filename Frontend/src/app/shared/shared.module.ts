import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TabsModule } from 'primeng/tabs';
import { InputOtpModule } from 'primeng/inputotp';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { CardPequennaComponent } from './components/card-pequenna/card-pequenna.component';
import { InputLabelComponent } from './components/input-label/input-label.component';
import { MenuColumnComponent } from './components/menu-column/menu-column.component';
import { SuspenseComponent } from './components/suspense/suspense.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from './primeng/primeng.module';
import { AppRoutingModule } from '../app-routing.module';
import {RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ButtonComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    ButtonComponent,
    CardPequennaComponent,
    InputLabelComponent,
    MenuColumnComponent,
    SuspenseComponent,
    ToggleButtonComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    ButtonComponent,
    CardPequennaComponent,
    InputLabelComponent,
    MenuColumnComponent,
    SuspenseComponent,
    ToggleButtonComponent,
    PrimengModule,
    FormsModule,
  ],
})
export class SharedModule {}
