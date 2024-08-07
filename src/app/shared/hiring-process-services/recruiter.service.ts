import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Recruiter } from '../model/recruiter';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  private baseUrl = `${environment.hiringprocessurl}/recruiter`;

  constructor(private http: HttpClient) { }

  getRecruiterList(): Observable<Recruiter[]> {
    return this.http.get<Recruiter[]>(`${this.baseUrl}/all`);
  }

  addRecruiter(recruiter: Recruiter): Observable<Recruiter> {
    return this.http.post<Recruiter>(`${this.baseUrl}/`, recruiter);
  }
  getRecruiterById(recruiterId: number): Observable<Recruiter> {
    return this.http.get<Recruiter>(`${this.baseUrl}/${recruiterId}`);
  }

  updateRecruiter(recruiter: Recruiter): Observable<Recruiter> {
    return this.http.put<Recruiter>(`${this.baseUrl}/${recruiter.id}`, recruiter);
  }
  deleteRecruiter(recruiterId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${recruiterId}`);
  }

  searchRecruiters(code: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/searchpage`, {
      params: {
        code,
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  getRecruiterListWithPagination(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/recruiterlistwithpagination`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

}
