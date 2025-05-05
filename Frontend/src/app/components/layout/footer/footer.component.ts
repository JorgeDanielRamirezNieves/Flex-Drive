import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerContactInfo = [
    { text: 'flexdrive@gmail.com', icon: 'assets/icons/correo2.png' },
    { text: '+57 300 000 0000', icon: 'assets/icons/telefono.png' },
    { text: 'Whatsapp', icon: 'assets/icons/whatsapp.png' },
    { text: 'Colombia', icon: 'assets/icons/alfiler.png' },
    { text: 'flexdriveColombia', icon: 'assets/icons/instagram.png' },
    { text: 'flexdriveColombia', icon: 'assets/icons/facebook.png' },
  ];

  footerLinks = [
    {
      text: '¿Por qué Flex Drive?',
      link: '/landing/whyUs',
    },
    {
      text: 'Acerca de nosotros',
      link: '/landing/aboutUs',
    },
    { text: 'Contacto', link: '/landing/contactUs' },
    { text: 'Login', link: '/user/login' },
    {
      text: 'Registrarse',
      link: '/user/register',
    },
  ];
}
