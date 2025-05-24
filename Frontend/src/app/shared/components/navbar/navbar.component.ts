import { Component } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  rol: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.updateLoginStatus();
    const roleObj = this.authService.getUserRole();
    console.log('Rol recibido desde el servicio:', roleObj);

    this.rol = this.authService.getUserRole();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
  }

  updateLoginStatus(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
  logout(): void {
    this.authService.logout();
  }
}
