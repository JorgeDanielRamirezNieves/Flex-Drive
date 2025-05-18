import { Component } from '@angular/core';

@Component({
  selector: 'app-profilesettings',
  standalone: false,
  templateUrl: './profilesettings.component.html',
  styleUrl: './profilesettings.component.css',
})
export class ProfilesettingsComponent {
  cards = [
    {
      title: 'Notificaciones',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
      imageS: '../../../../assets/icons/notificacion.png',
      toggle: { type: 'text', labels: ['Si', 'No'], value: true },
      // toggle: { type: 'simple', value: false }, // Simple toggle sin texto ni iconos
    },
    {
      title: 'Correos',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
      imageS: '../../../../assets/icons/correo.png',
      toggle: { type: 'text', labels: ['Si', 'No'], value: true },
    },
    {
      title: 'Tema',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
      imageS: '../../../../assets/icons/solLuna.png',
      buttonLabel: 'Adquirir Plan',
      toggle: {
        type: 'icon',
        icons: [
          '../../../../assets/icons/sol.png',
          '../../../../assets/icons/luna.png',
        ],
        value: true,
      },
    },
    {
      title: 'Idioma',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
      imageS: '../../../../assets/icons/idioma.png',
      toggle: { type: 'text', labels: ['Esp', 'Eng'], value: true },
    },
    {
      title: 'Eliminar chats',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur a',
      imageS: '../../../../assets/icons/mensaje.png',
      toggle: { type: 'text', labels: ['Si', 'No'], value: true },
    },
  ];
}
