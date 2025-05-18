import { Component } from '@angular/core';

@Component({
  selector: 'app-activechats',
  standalone: false,
  templateUrl: './activechats.component.html',
  styleUrl: './activechats.component.css',
})
export class ActivechatsComponent {
  activeSection: string = 'Recientes';
  menuItems = [
    {
      title: 'Recientes',
      section: 'recientes',
      icon: 'edit.png',
      iconActive: 'editSelect.png',
    },
    {
      title: 'Servicios en proceso',
      section: 'en-proceso',
      icon: 'myvehicles.png',
      iconActive: 'selectedMyVehicles.png',
    },
    {
      title: 'Todos los servicios',
      section: 'todos',
      icon: 'rentalvehicles.png',
      iconActive: 'selectedRentalvehicles.png',
    },
  ];
}
