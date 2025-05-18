import { ColumnMessageComponent } from './components/column-message/column-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivechatsComponent } from './components/activechats/activechats.component';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ActivechatsComponent, ColumnMessageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
