import { Component } from '@angular/core';

interface ChatMessage {
  sender: string;
  text: string;
}

interface User {
  names: string;
  lastName: string;
  messages: ChatMessage[];
  idService: number;
}

@Component({
  selector: 'app-column-message',
  standalone: false,
  templateUrl: './column-message.component.html',
  styleUrl: './column-message.component.css',
})
export class ColumnMessageComponent {
  searchTerm: string = '';
  newMessage: string = '';
  activeSection: string = 'recientes';
  selectedUser: User | null = null;

  services: User[] = [
    {
      idService: 1,
      names: 'Wldy Enrique',
      lastName: 'Sandoval Garzon',
      messages: [
        { sender: 'usuario', text: 'Hola, ¿cómo estás?' },
        { sender: 'yo', text: 'Todo bien, gracias. ¿Y tú?' },
      ],
    },
    {
      idService: 1,
      names: 'Gabriela',
      lastName: 'Bejarano',
      messages: [
        { sender: 'usuario', text: '¿Cuándo será el servicio?' },
        { sender: 'yo', text: 'Mañana a las 10 a.m.' },
      ],
    },
    {
      idService: 2,
      names: 'pepe julio',
      lastName: 'garcia',
      messages: [
        { sender: 'usuario', text: 'Hola, ¿cómo estás?' },
        { sender: 'yo', text: 'Todo bien, gracias. ¿Y tú?' },
      ],
    },
    {
      idService: 2,
      names: 'Julian',
      lastName: 'Niño',
      messages: [
        { sender: 'usuario', text: '¿Cuándo será el servicio?' },
        { sender: 'yo', text: 'Mañana a las 10 a.m.' },
      ],
    },
    {
      idService: 3,
      names: 'Julian',
      lastName: 'Lopez',
      messages: [
        { sender: 'usuario', text: '¿Cuándo será el servicio?' },
        { sender: 'yo', text: 'Mañana a las 10 a.m.' },
      ],
    },
  ];

  menuItems = [
    {
      title: 'Recientes',
      section: 'recientes',
      // Preguntar si dejar asi o solo en todos
      users: this.getUsersByService(1),
    },
    {
      title: 'Servicios en proceso',
      section: 'en-proceso',

      users: this.getUsersByService(2),
    },
    {
      title: 'Todos los servicios',
      section: 'todos',
      // Muestra todos los usuarios
      users: this.services,
    },
  ];

  // Función para obtener usuarios por servicio
  getUsersByService(serviceId: number): User[] {
    return this.services.filter((user) => user.idService === serviceId);
  }

  setSection(section: string) {
    this.activeSection = section;
    this.selectedUser = null; // Resetea el usuario seleccionado al cambiar de sección
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser) {
      this.selectedUser.messages.push({
        sender: 'yo',
        text: this.newMessage.trim(),
      });
      this.newMessage = '';
    }
  }

  getFilteredUsers() {
    const section = this.menuItems.find(
      (item) => item.section === this.activeSection
    );

    if (!section || !section.users) return [];

    return section.users.filter((user) =>
      user.names.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
