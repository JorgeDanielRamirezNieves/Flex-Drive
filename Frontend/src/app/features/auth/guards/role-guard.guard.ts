import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return router.navigate(['/user/login']);
  }
  const userRole = authService.getUserRole();
  if (userRole === 'admin') {
    return true;
  } 
  return router.navigate(['/landing']); 
};
