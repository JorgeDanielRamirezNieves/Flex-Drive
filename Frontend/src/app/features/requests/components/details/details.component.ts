import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import { Request } from '../../models/request';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent  {
  @Input() public request: Request | undefined;
  @Input() public isOwner: boolean;
  public loadingService: boolean;
  constructor(private messageService:MessageService, private router: Router) {
    this.loadingService = false;
    this.isOwner = false;
  }

  public createService(){
    this.messageService.add({severity:'info', summary: 'Creando el servicio', detail: 'El servicio se esta creando'});
    this.loadingService = true;    
    setTimeout(() => {
      this.loadingService = false;
      this.messageService.add({severity:'success', summary: 'Servicio creado', detail: 'El servicio se ha creado correctamente'});
    }, 3000);
  }
}
