import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HousingLocationInfo } from './housinglocation';
import { environment } from '../environments/environment';

export function handleHttpError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.error('Network error');
  } else {
    console.error(`Backend returned code ${error.status}`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/locations`;

  getAllHousingLocations(): Observable<HousingLocationInfo[]> {
    return this.http.get<HousingLocationInfo[]>(this.url).pipe(
      catchError((error: HttpErrorResponse) => {
        handleHttpError(error);
        return throwError(() => error);
      }),
    );
  }

  getHousingLocationById(id: number): Observable<HousingLocationInfo> {
    return this.http.get<HousingLocationInfo>(`${this.url}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        handleHttpError(error);
        return throwError(() => error);
      }),
    );
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application: ${firstName} ${lastName} - ${email}`);
  }
}
