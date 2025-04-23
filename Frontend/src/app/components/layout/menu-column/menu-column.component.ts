import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-column',
  standalone: false,
  templateUrl: './menu-column.component.html',
  styleUrl: './menu-column.component.css',
})
export class MenuColumnComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  menuItems = [
    {
      title: 'Mi Perfil',
      route: '/landing/editprofile',
      icon: 'edit.png',
      iconActive: 'editSelect.png',
    },
    {
      title: 'Mis Vehículos',
      route: '/landing/myvehicles',
      icon: 'myvehicles.png',
      iconActive: 'selectedMyVehicles.png',
    },
    {
      title: 'Vehículos Rentados',
      route: '/landing/rentalvehicles',
      icon: 'rentalvehicles.png',
      iconActive: 'selectedRentalvehicles.png',
    },
    {
      title: 'Suscripciones',
      route: '/landing/subscriptions',
      icon: 'subscriptions.png',
      iconActive: 'subscriptionsSelect.png',
    },
    {
      title: 'Chats Activos',
      route: '/landing/activechats',
      icon: 'activechats.png',
      iconActive: 'activechatsSelect.png',
    },
    {
      title: 'Ajustes',
      route: '/landing/profilesettings',
      icon: 'settings.png',
      iconActive: 'selectedSettings.png',
    },
  ];
}
