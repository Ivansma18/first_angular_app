import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';

let activeRequests = 0;

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  activeRequests++;

  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });

  return next(clonedRequest).pipe(
    finalize(() => {
      activeRequests--;
      console.log('Active HTTP requests:', activeRequests);
    }),
    catchError((error) => {
      console.error('HTTP Error:', error);

      return throwError(() => error);
    }),
  );
};
