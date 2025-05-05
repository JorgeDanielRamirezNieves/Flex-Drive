import { Component } from '@angular/core';
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
      route: '/user/editprofile',
      icon: 'edit.png',
      iconActive: 'editSelect.png',
    },
    {
      title: 'Mis Vehículos',
      route: '/vehicles/myvehicles',
      icon: 'myvehicles.png',
      iconActive: 'selectedMyVehicles.png',
    },
    {
      title: 'Vehículos Rentados',
      route: '/services/rentalvehicles',
      icon: 'rentalvehicles.png',
      iconActive: 'selectedRentalvehicles.png',
    },
    {
      title: 'Solicitudes',
      route: '/requests/viewAll',
      icon: 'requests.png',
      iconActive: 'requestsSelected.png',
    },
    {
      title: 'Suscripciones',
      route: '/user/subscriptions',
      icon: 'subscriptions.png',
      iconActive: 'subscriptionsSelect.png',
    },
    {
      title: 'Chats Activos',
      route: '/user/activechats',
      icon: 'activechats.png',
      iconActive: 'activechatsSelect.png',
    },
    {
      title: 'Ajustes',
      route: '/user/profilesettings',
      icon: 'settings.png',
      iconActive: 'selectedSettings.png',
    },
  ];
}
