import { HttpInterceptorFn ,HttpErrorResponse} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  console.log("Token");
  console.log(token);

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Logical next step: Clear local storage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('email');
        localStorage.removeItem('user_type');
        console.error('Unauthorized request - session may have expired.');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
  }
  return next(req);
};
