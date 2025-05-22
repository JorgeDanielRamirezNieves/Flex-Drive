import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {RouterModule } from '@angular/router';
import { VehiculoCardComponent } from './components/vehiculo-card/vehiculo-card.component';

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
    VehiculoCardComponent
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
    CardPequennaComponent,
    InputLabelComponent,
    MenuColumnComponent,
    SuspenseComponent,
    ToggleButtonComponent,
    VehiculoCardComponent,
    PrimengModule,
    FormsModule,
  ],
})
export class SharedModule {}
