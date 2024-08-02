import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CandidateEmail } from '../hiring-process-services-model/candidateEmail';
import { Pagination } from '../hiring-process-services-model/pagination';

@Injectable({
  providedIn: 'root'
})
export class EmailtemplateService {

  private baseUrl = `${environment.hiringprocessurl}/email/`;

  constructor(private http: HttpClient) { }

  getEmailDataByTitle(title: string): Observable<CandidateEmail> {
    return this.http.get<CandidateEmail>(`${this.baseUrl}byTitle?title=${title}`);
  }

  getEmailList(): Observable<CandidateEmail[]> {
    return this.http.get<CandidateEmail[]>(`${this.baseUrl}all`);
  }

  getEmailTemplateListWithPagination(page: number, size: number): Observable<Pagination> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Pagination>(`${this.baseUrl}emaillistwithpagination`, { params });
  }

  deleteEmail(emailId: number): Observable<CandidateEmail[]> {
    return this.http.delete<CandidateEmail[]>(`${this.baseUrl}${emailId}`);
  }

  searchEmail(keyword: string, page: number, size: number): Observable<{ content: CandidateEmail[], totalElements: number, totalPages: number }> {
    const params = new HttpParams()
      .set('code', keyword)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<{ content: CandidateEmail[], totalElements: number, totalPages: number }>(`${this.baseUrl}searchpage`, { params });
  }

  updateEmail(candidateEmail: CandidateEmail): Observable<CandidateEmail> {
    return this.http.put<CandidateEmail>(`${this.baseUrl}${candidateEmail.id}`, candidateEmail);
  }

  addEmail(candidateEmail: CandidateEmail): Observable<CandidateEmail> {
    return this.http.post<CandidateEmail>(`${this.baseUrl}`, candidateEmail);
  }
}

