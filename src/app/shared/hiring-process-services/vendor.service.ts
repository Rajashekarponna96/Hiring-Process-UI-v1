import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Vendor } from '../model/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private baseUrl = `${environment.hiringprocessurl}/vendor`;

  constructor(private http: HttpClient) { }

  addVendor(vendor: Vendor): Observable<Vendor> {

    return this.http.post<Vendor>(`${this.baseUrl}/`, vendor);
  }

  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.baseUrl}/${vendor.id}`, vendor);
  }

  deleteVendor(vendorId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${vendorId}`);
  }

  getVendorListWithPagination(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vendorlistwithpagination`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }
  searchVendorByCode(code: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/searchpage`, {
      params: {
        code: code,
        page: page.toString(),
        size: size.toString()
      }
    });
  }
}
