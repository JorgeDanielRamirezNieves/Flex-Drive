import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { ViewAllComponent } from './components/view-all/view-all.component';

const routes: Routes = [
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: '',
    component: ViewAllComponent
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
export class RequestsRoutingModule { }
