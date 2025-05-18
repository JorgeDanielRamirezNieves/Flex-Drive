import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() public request: any;
  public loadingService: boolean;
  constructor(private messageService:MessageService, private router: Router) {
    this.loadingService = false;
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
