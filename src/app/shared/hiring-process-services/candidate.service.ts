import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Candidate } from '../model/candidate';
//import { Location } from '@angular/common';
import { Currency } from '../model/currency';
import { environment } from 'environments/environment';
import { Job } from '../model/job';
import { Pagination } from '../model/pagination';
import { Source } from '../model/source';
import { TalentPool } from '../model/talentpool';
import { Vendor } from '../model/vendor';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private baseUrl = `${environment.hiringprocessurl}`;

  constructor(private http: HttpClient) { }

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/candidate/all`).pipe(
      catchError(this.handleError)
    );
  }



  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.baseUrl}/candidate/${candidate.id}`, candidate).pipe(
      catchError(this.handleError)
    );
  }
  getAllSources(): Observable<Source[]> {
    return this.http.get<Source[]>(`${this.baseUrl}/source/all`).pipe(
      catchError(this.handleError)
    );
  }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/location/all`).pipe(
      catchError(this.handleError)
    );
  }

  getAllTalentPools(): Observable<TalentPool[]> {
    return this.http.get<TalentPool[]>(`${this.baseUrl}/talentPool/all`).pipe(
      catchError(this.handleError)
    );
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/job/all`).pipe(
      catchError(this.handleError)
    );
  }

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.baseUrl}/currency/all`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError1(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getVendorDetailsByUserId(userId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vendor/user/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(`${this.baseUrl}/candidate/`, candidate).pipe(
      catchError(this.handleError)
    );
  }


  // addCandidate(candidate: Candidate, file: File): Observable<Candidate> {
  //   // Create a FormData object to send both the candidate and the file
  //   const formData: FormData = new FormData();
  
  //   // Append the candidate data as a JSON string
  //   formData.append('candidate', new Blob([JSON.stringify(candidate)], { type: 'application/json' }));
  
  //   // Append the file if it exists
  //   if (file) {
  //     formData.append('file', file);
  //   }
  
  //   // Send the form data to the backend using HttpClient
  //   return this.http.post<Candidate>(`${this.baseUrl}/candidate/add`, formData).pipe(
  //     catchError(this.handleError)  // Handle any errors
  //   );
  // }


deleteCandidate(candidateId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/candidate/${candidateId}`).pipe(
      catchError(this.handleError)
    );
  }


  getCandidatesByVendorId(vendorId: any, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vendor/candidates/${vendorId}`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  getCandidatesWithPagination(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidate/candidatelistwithpagination`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    }).pipe(
      catchError(this.handleError)
    );
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


  // constructor(private http: HttpClient) {}

  // uploadFile(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   return this.http.post<any>(this.baseUrl, formData).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // uploadFile(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   return this.http.post<any>(`${this.baseUrl}/uploadfile`, formData).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  // uploadFile(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   return this.http.post<any>(`${this.baseUrl}/uploadfile`, formData).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.baseUrl}/fileupload/`, formData).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error uploading file:', error);
    return throwError('Failed to upload file. Please try again later.');
  }


  ///


  getInactiveCandidates(page: number, size: number): Observable<Pagination> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Pagination>(`${this.baseUrl}/candidate/inactivecandidatelistwithpagination`, { params })
      .pipe(catchError(this.handleError));
  }


  getVendorByUserId(userId: any): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.baseUrl}/user/${userId}`).pipe(catchError(this.handleError));
  }


  private handleError2(error: HttpErrorResponse): Observable<never> {
    console.error('Error uploading file:', error);
    return throwError('Failed to upload file. Please try again later.');
  }
}




