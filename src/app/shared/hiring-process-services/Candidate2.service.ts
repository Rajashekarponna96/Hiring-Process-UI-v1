import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Candidate } from '../hiring-process-services-model/candidate';
import { Vendor } from '../hiring-process-services-model/vendor';

@Injectable({
  providedIn: 'root'
})
export class Candidate2Service {

  private baseUrl = `${environment.hiringprocessurl}`;

  constructor(private http: HttpClient) { }

  getInactiveCandidates(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidate/inactive`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  getCandidatesByStage(stage: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidate/candidateStage1/${stage}`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  searchCandidates(query: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidate/searchpage`, {
      params: { code: query, page: page.toString(), size: size.toString() }
    });
  }

  deleteCandidate(candidateId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/candidate/${candidateId}`);
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.baseUrl}/candidate/${candidate.id}`, candidate);
  }

  getVendorByUserId(userId: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.baseUrl}/vendor/user/${userId}`);
  }

  getCandidatesByVendorId(vendorId: number, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vendor/candidates/${vendorId}`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  getCandidatesByCandidateId(candidateId: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.baseUrl}/candidate/userid/${candidateId}`);
  }
}

