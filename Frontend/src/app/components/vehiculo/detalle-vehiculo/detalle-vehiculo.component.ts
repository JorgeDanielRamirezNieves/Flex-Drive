import { Component, model } from '@angular/core';

@Component({
  selector: 'app-detalle-vehiculo',
  standalone: false,
  templateUrl: './detalle-vehiculo.component.html',
  styleUrl: './detalle-vehiculo.component.css',
})
export class DetalleVehiculoComponent {
  public images: Object[] = [
    {
      itemImageSrc:
        'https://i.ibb.co/VYb1cFjp/b8958791a88f.jpg',
      thumbnailImageSrc:
        'https://i.ibb.co/VYb1cFjp/b8958791a88f.jpg',
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
  constructor() {
  }
}
