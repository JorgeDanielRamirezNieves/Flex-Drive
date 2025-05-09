import { Component, model, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-service',
  standalone: false,
  templateUrl: './details-service.component.html',
  styleUrl: './details-service.component.css',
})
export class DetailsServiceComponent implements OnInit {
  public service: any;
  public codOTP: string;
  public codOTPgenerated: string;
  public remainingTime: number   
  constructor() {
    this.codOTP = '';
    this.remainingTime = 30;
    this.codOTPgenerated = this.simulateOTP();
    this.service = {
      id: 1,
      creation_date: '2023-10-01',
      request: {
        description:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.',
        pickupDate: new Date('2023-10-03'),
        returnDate: new Date('2023-10-10'),
        status: 'approved',
        user: {
          document: '1234567890',
          name: 'John Doe',
          email: '',
          phone: '1234567890',
          address: '123 Main St, City, Country',
          city: 'City',
          country: 'Country',
          birthdate: '1990-01-01',
          rating: 4.5,
          documentType: 'CC',
          rol: 'user',
          image: 'https://example.com/image.jpg',
        },
        vehicle: {
          placa: 'ABC123',
          color: 'Red',
          rating: 4.5,
          images: [
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
          ],
          accesorios: ['GPS', 'Child Seat', 'Bluetooth'],
          capacidad: 5,
          puertas: 4,
          carga: 500,
          detalles: {
            transmision: 'Automatic',
            combustible: 'Gasoline',
            cilindraje: 1800,
            marca: 'Toyota',
            modelo: 'Corolla',
            year: 2020,
          },
          soat: {
            poliza: '123456789',
            status: 'active',
            fecha_inicio: '2023-01-01',
            fecha_fin: '2024-01-01',
            fecha_expedicion: '2024-01-01',
            entidad: 'Seguros S.A.',
          },
          tecnomecanica: {
            certificado: '123456789',
            status: 'active',
            fecha_vigencia: '2023-01-01',
            fecha_expedicion: '2024-01-01',
            cda: 'CDA S.A.',
          },
          multas: [
            {
              no_comparendo: '123456',
              status: 'inactive',
              fecha_comparendo: '2023-01-01',
              entidad: 'Policia',
              codigo_infraccion: '1234',
            },
            {
              no_comparendo: '654321',
              status: 'active',
              fecha_comparendo: '2023-01-01',
              entidad: 'Policia',
              codigo_infraccion: '5678',
            },
            {
              no_comparendo: '789012',
              status: 'inactive',
              fecha_comparendo: '2023-01-01',
              entidad: 'Policia',
              codigo_infraccion: '9101',
            },  
          ],
        },
      },
      status: 'for_receive',
    };
  }

  ngOnInit() {
    this.countDownOTP(); 
  }

  public simulateOTP() {
    // Simulate OTP generation
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    this.codOTPgenerated = generatedOTP;
    return generatedOTP;
  }

  public countDownOTP() {
    let remainingTime = this.remainingTime;

      setInterval(() => {
      if (remainingTime <= 1) {
        remainingTime = 30
        this.codOTPgenerated = this.simulateOTP(); 
      } else {
        remainingTime--;
        this.remainingTime = remainingTime;
        console.log(`Time remaining: ${remainingTime} seconds`);
      }
    }, 1000); 
  }
}
