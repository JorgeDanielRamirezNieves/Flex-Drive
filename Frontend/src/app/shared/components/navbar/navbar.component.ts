import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { NotificationsService } from '../../../features/notifications/services/notifications.service';
import { Notification } from '../../../features/notifications/models/notification';
import { catchError, finalize, interval, map, Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { observatorAny } from '../../../core/tipo-any';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean;
  public rol: string | null;
  public visible: boolean;
  public notifications: Notification[];
  public subcription: Subscription;
  public tmp: any;
  public userUUID: string;
  public token: any;
  public complete: boolean;
  private roleSub: Subscription | null = null;
  private tokenCheckSub: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationsService
  ) {
    this.isLoggedIn = false;
    this.rol = null;
    this.visible = false;
    this.notifications = [];
    this.subcription = this.tmp;
    
    if (localStorage.getItem('authToken')) {
      this.token = jwtDecode(localStorage.getItem('authToken') || '');
      this.userUUID = this.token.uuid;
    } else {
      this.userUUID = '';
    }    
    this.complete = false;
  }

  ngOnInit(): void {
    this.updateLoginStatus();
    const roleObj = this.authService.getUserRole();

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
    if (this.authService.isAuthenticated()) {
      this.getNotifications();
    }
  }

  private getNotifications() {
    this.subcription = this.notificationService
      .getNotificationsByUser(this.userUUID)
      .pipe(
        map((res: any) => {
          this.notifications = res;
        }),
        catchError((err) => {          
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  toggle() {
    this.visible = !this.visible;
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
