import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Candidate } from '../hiring-process-services-model/candidate';
import { Pagination } from '../hiring-process-services-model/pagination';
import { Vendor } from '../hiring-process-services-model/vendor';
@Injectable({
  providedIn: 'root'
})
export class Candidate4Service {

  private baseUrl = `${environment.hiringprocessurl}`;

  constructor(private http: HttpClient) { }

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/candidate/all`)
      .pipe(catchError(this.handleError));
  }

  getCandidatesWithPagination(page: number, size: number): Observable<Pagination> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Pagination>(`${this.baseUrl}/candidate/candidatelistwithpagination`, { params })
      .pipe(catchError(this.handleError));
  }


  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/candidate/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.baseUrl}/candidate/${candidate.id}`, candidate).pipe(
      catchError(this.handleError)
    );
  }

  getVendorByUserId(userId: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.baseUrl}/vendor/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  getCandidatesByVendorId(vendorId: number, page: number, size: number): Observable<Pagination> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Pagination>(`${this.baseUrl}/vendor/candidates/${vendorId}`, { params })
      .pipe(catchError(this.handleError));
  }

  getCandidateByUserId(userId: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.baseUrl}/candidate/userid/${userId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server-side error: ${error.status} - ${error.message}`);
    }
    return throwError('Something went wrong; please try again later.');
  }

  searchCandidates(inputValue: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidate/searchpage`, {
      params: {
        code: inputValue,
        page: page.toString(),
        size: size.toString()
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
}
