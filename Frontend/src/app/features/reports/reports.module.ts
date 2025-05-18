import { ReportsRoutingModule } from './reports-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPqrsComponent } from './components/admin-pqrs/admin-pqrs.component';
import { PqrsComponent } from './components/pqrs/pqrs.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [AdminPqrsComponent, PqrsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
