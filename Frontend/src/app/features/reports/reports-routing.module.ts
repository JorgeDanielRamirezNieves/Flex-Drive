import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PqrsComponent } from './components/pqrs/pqrs.component';
import { AdminPqrsComponent } from './components/admin-pqrs/admin-pqrs.component';
import { roleGuardGuard } from '../auth/guards/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: PqrsComponent,
  },
  {
    path: 'admin-pqrs',
    component: AdminPqrsComponent,
    canActivate: [roleGuardGuard], // Assuming you have a role guard for admin access
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
