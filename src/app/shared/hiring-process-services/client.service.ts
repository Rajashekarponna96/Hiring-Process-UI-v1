import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private baseUrl = `${environment.hiringprocessurl}/client`;

  constructor(private http: HttpClient) { }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/`, client);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/all`);
  }

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${clientId}`);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${client.id}`, client);
  }

  deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${clientId}`);
  }

  searchClientByCode(code: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/searchpage`, {
      params: { code, page: page.toString(), size: size.toString() }
    });
  }

  getClientListWithPagination(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/clientlistwithpagination`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }
}

