import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from 'rxjs';
import { FileUpload } from "../model/fileupload";


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl = `${environment.hiringprocessurl}`;

  constructor(private http: HttpClient) { }



  getAllResumes(): Observable<FileUpload[]> {
    return this.http.get<FileUpload[]>(`${this.baseUrl}/fileupload/all`);
  }

  addResume(fileUpload: FileUpload): Observable<FileUpload[]> {
    return this.http.post<FileUpload[]>(`${this.baseUrl}/fileupload/`, fileUpload);
  }

  getResumesListWithPagination(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/fileupload/resumeslistwithpagination`, { params });
  }

  searchResumeByCode(code: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/fileupload/searchpage`, {
      params: {
        code: code,
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  viewFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/fileupload/view/${fileName}`, {
      responseType: 'blob'
    });
  }


}
