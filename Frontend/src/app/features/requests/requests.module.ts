import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './components/details/details.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { SharedModule } from '../../shared/shared.module';
import { RequestsRoutingModule } from './requests-routing.module';



@NgModule({
  declarations: [DetailsComponent, ViewAllComponent],
  imports: [
    CommonModule,
    SharedModule,
    RequestsRoutingModule
  ]
})
export class RequestsModule { }
