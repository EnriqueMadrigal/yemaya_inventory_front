import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles'];
  
  console.log(expectedRoles);
  const currentUser = authService.getUserType();
  const userRoles = authService.getUserType() ?? "";

  if (currentUser && expectedRoles.includes(userRoles)) {
    return true;
  }


  //if (authService.isLoggedIn()) return true;
  
if (!authService.isLoggedIn()) {
  router.navigate(['/login']);
  return false;
}
  


  //router.navigate(['/login']);
  router.navigate(['/unauthorized']);
  return false;
};
