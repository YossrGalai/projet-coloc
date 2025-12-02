import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';


export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isConnected() && auth.getUserRole() === 'admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
