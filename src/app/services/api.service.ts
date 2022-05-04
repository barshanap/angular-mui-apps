import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = SERVER_API_URL;

  constructor(private http: HttpClient) {}

  postProducts(data: any) {
    return this.http.post<any>(`${this.apiUrl}/`, data);
  }
  getProducts() {
    return this.http.get<any>(`${this.apiUrl}/`);
  }
  putProducts(data: any, id: number) {
    return this.http.put<any>(`${this.apiUrl}/` + id, data);
  }
  deleteProducts(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/` + id);
  }
}
