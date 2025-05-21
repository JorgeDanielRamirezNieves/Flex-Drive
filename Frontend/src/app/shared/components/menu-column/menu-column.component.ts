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
      route: '/services/viewAll',
      icon: 'rentalvehicles.png',
      iconActive: 'selectedRentalvehicles.png',
    },
    {
      title: 'Solicitudes',
      route: '/requests',
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
    {
      title: 'PQRS',
      route: '/reports',
      icon: 'PQRSB.png',
      iconActive: 'PQRSS.png',
    },
  ];

  menuItemsAdmin = [
    {
      title: 'PQRS',
      route: '/admin/admin-pqrs',
      icon: 'advertencia.png',
      iconActive: 'advertencia-2.png',
    },
  ];

  get visibleMenuItems() {
    const currentUrl = this.router.url;
    return currentUrl.startsWith('/admin/admin-pqrs')
      ? this.menuItemsAdmin
      : this.menuItems;
  }
}
