import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { DetailsServiceComponent } from './components/details-service/details-service.component';

const routes: Routes = [
  {
    path: 'viewAll',
    component: ViewAllComponent,
  },
  { path: 'details', component: DetailsServiceComponent },
  { path: '', redirectTo: 'viewAll', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ServicesRentRoutingModule { }
