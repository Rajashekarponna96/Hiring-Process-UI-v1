import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Job } from '../model/job';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = `${environment.hiringprocessurl}/job`;

  constructor(private http: HttpClient) { }

  getAllJobsWithClients(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/all`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error.message);
    return throwError('Something bad happened; please try again later.');
  }
}

