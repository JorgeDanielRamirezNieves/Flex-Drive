import { MessageService } from 'primeng/api';
import { Component, model } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-vehiculo',
  standalone: false,
  templateUrl: './detalle-vehiculo.component.html',
  styleUrl: './detalle-vehiculo.component.css',
})
export class DetalleVehiculoComponent {
  public images: Object[] = [
    {
      itemImageSrc: 'https://i.ibb.co/VYb1cFjp/b8958791a88f.jpg',
      thumbnailImageSrc: 'https://i.ibb.co/VYb1cFjp/b8958791a88f.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
      alt: 'Description for Image 2',
      title: 'Title 2',
    },
    {
      itemImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
      alt: 'Description for Image 3',
      title: 'Title 3',
    },
    {
      itemImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
      alt: 'Description for Image 4',
      title: 'Title 4',
    },
    {
      itemImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
      alt: 'Description for Image 5',
      title: 'Title 5',
    },
    {
      itemImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
      alt: 'Description for Image 6',
      title: 'Title 6',
    },
  ];

  constructor(private messageService: MessageService, private router: Router) {}

  public sendRequest() {
    /* Aqui va la logica que tengamos con el back */
    console.log('Se ha enviado la solicitud al propietario del vehiculo');
    this.messageService.add({
      severity: 'success',
      summary: 'Mensaje enviado',
      detail: 'se envió el mensaje al propietario',
      life: 5000,
    });
    setTimeout(() => {
      this.router.navigate(["/requests"])
    }, 1000);
  }
}
