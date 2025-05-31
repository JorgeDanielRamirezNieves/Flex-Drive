import { jwtDecode } from 'jwt-decode';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-column',
  standalone: false,
  templateUrl: './menu-column.component.html',
  styleUrl: './menu-column.component.css',
})
export class MenuColumnComponent {
  public token: any;
  public role: string;
  public menuItems: any[] = [];
  public dashboardItems: any;

  constructor(private router: Router) {
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.role = this.token.rolUser.name;
    console.log('Role:', this.role);
    this.initMenuItems();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  private initMenuItems(): void {
    this.menuItems = [
      {
        title: 'Mi Perfil',
        route: '/user/editprofile',
        icon: 'edit.png',
        iconActive: 'editSelect.png',
        admin: true,
      },
      {
        title: 'Mis Vehículos',
        route: '/vehicles/myvehicles',
        icon: 'myvehicles.png',
        iconActive: 'selectedMyVehicles.png',
        admin: true,
      },
      {
        title: 'Vehículos Rentados',
        route: '/services/viewAll',
        icon: 'rentalvehicles.png',
        iconActive: 'selectedRentalvehicles.png',
        admin: true,
      },
      {
        title: 'Solicitudes',
        route: '/requests',
        icon: 'requests.png',
        iconActive: 'requestsSelected.png',
        admin: true,
      },
      {
        title: 'Suscripciones',
        route: '/user/subscriptions',
        icon: 'subscriptions.png',
        iconActive: 'subscriptionsSelect.png',
        admin: true,
      },
      {
        title: 'Chats Activos',
        route: '/user/activechats',
        icon: 'activechats.png',
        iconActive: 'activechatsSelect.png',
        admin: true,
      },
      {
        title: 'Ajustes',
        route: '/user/profilesettings',
        icon: 'settings.png',
        iconActive: 'selectedSettings.png',
        admin: true,
      },
      {
        title: 'PQRS',
        route: '/reports',
        icon: 'PQRSB.png',
        iconActive: 'PQRSS.png',
        admin: true,
      },

      {
        title: 'PQRS',
        route: '/reports/admin-pqrs',
        icon: 'advertencia.png',
        iconActive: 'advertencia-2.png',
        admin: this.role === 'admin',
      },
    ];
    this.dashboardItems = {
      title: 'Dashboard',
      route: 'http://20.62.190.96:3000/', // ruta de metabase
      icon: 'admin.png',
      iconActive: 'adminSelect.png',
      admin: this.role === 'admin',
    };
  }
}
