import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Client } from '../model/client';
import { Currency } from '../model/currency';
import { Department } from '../model/Department';
import { Job } from '../model/job';
import { Recruiter } from '../model/recruiter';
import { Vendor } from '../model/vendor';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl = `${environment.hiringprocessurl}`;

  constructor(private http: HttpClient) { }

  getUnassignedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/unassigned-jobs`);
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/job/all`);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.baseUrl}/job/`, job);
  }

  assignVendorToJob(jobId: number, vendorId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/job/${jobId}/vendors`, { vendorId });
  }

  updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/job/${job.id}`, job);
  }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/department/all`);
  }
  deleteJob(jobId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/job/${jobId}`);
  }
  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.baseUrl}/currency/all`);
  }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.baseUrl}/job/allvendorslist`);
  }

  getAllRecruiters(): Observable<Recruiter[]> {
    return this.http.get<Recruiter[]>(`${this.baseUrl}/recruiter/all`);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/client/all`);
  }
  // getAllLocations(): Observable<Location[]> {
  //   return this.http.get<Location[]>(`${this.baseUrl}/location/all`);
  // }
  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/location/all`);
  }
  getJobListWithPagination(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/job/joblistwithpagination`, { params });
  }

  searchJobsByCode(code: string, page: number, size: number): Observable<any> {
    const params = new HttpParams().set('code', code).set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/job/searchpage`, { params });
  }
  assignJobsToVendor(vendorIds: number[], jobIds: number[]): Observable<void> {
    const payload = { vendorIds, jobIds };
    return this.http.post<void>(`${this.baseUrl}/assign-jobs-to-vendors`, payload);
  }

  assignJobsToRecruiter(recruiterIds: number[], jobIds: number[]): Observable<void> {
    const payload = { recruiterIds, jobIds };
    return this.http.post<void>(`${this.baseUrl}/assign-jobs-to-recruiters`, payload);
  }
}
