import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  rol: string | null = null;

  private roleSub?: Subscription;
  private tokenCheckSub?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.updateLoginStatus();
    this.rol = this.authService.getUserRole();

    this.roleSub = this.authService.role$.subscribe((role) => {
      this.rol = role;
      this.updateLoginStatus();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });

    this.tokenCheckSub = interval(5000).subscribe(() => {
      if (!this.authService.isAuthenticated() && this.isLoggedIn) {
        this.logout();
      }
    });
  }

  updateLoginStatus(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.roleSub?.unsubscribe();
    this.tokenCheckSub?.unsubscribe();
  }
}
