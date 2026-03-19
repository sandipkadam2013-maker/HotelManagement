import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const auth = inject(Authservice);
  const router = inject(Router);

  const role = auth.getRole();
  const expectedRole = route.data?.['role'];

  // check login first
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // check role if defined
  if (expectedRole && role !== expectedRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};