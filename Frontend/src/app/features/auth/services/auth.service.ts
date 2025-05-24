import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../models/login';
import { Router } from '@angular/router';
import { URL_AUTH } from '../../../core/domains';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  private roleSubject = new BehaviorSubject<string | null>(
    this.getStoredRole()
  );
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private getStoredRole(): string | null {
    const stored = localStorage.getItem('role');
    return stored ? JSON.parse(stored) : null;
  }

  getUserRole(): string | null {
    return this.roleSubject.value;
  }

  setUserRole(role: string): void {
    localStorage.setItem('role', JSON.stringify(role));
    this.roleSubject.next(role);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(URL_AUTH + 'login', {
        email,
        password,
      })
      .pipe(
        tap((respuesta) => {
          const token = respuesta.response?.tokenApp;
          const role = respuesta.response?.rolUser;

          if (token) {
            this.setToken(token);
          }

          if (role) {
            this.setUserRole(role);
          }
        })
      );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch (error) {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('role');
    this.roleSubject.next(null);
    this.router.navigate(['/user/login']);
  }
}
