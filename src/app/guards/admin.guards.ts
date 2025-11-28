import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isUserConnected() && auth.getUserRole() === 'admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
