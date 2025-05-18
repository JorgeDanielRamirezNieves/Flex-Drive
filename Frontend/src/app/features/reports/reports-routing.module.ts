import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PqrsComponent } from './components/pqrs/pqrs.component';
import { AdminPqrsComponent } from './components/admin-pqrs/admin-pqrs.component';

const routes: Routes = [
  {
    path: '',
    component: PqrsComponent,
  },
  {
    path: 'admin-pqrs',
    component: AdminPqrsComponent,
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
