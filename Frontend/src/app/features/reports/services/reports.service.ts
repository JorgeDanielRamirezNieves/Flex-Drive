import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private baseUrl = 'http://localhost:3450/reports';

  constructor(private http: HttpClient) {}

  getAllReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/findAll`);
  }
  postReport(
    idTypeReport: string,
    description: string,
    idService: string,
    idUser: string
  ): Observable<Report> {
    return this.http.post<Report>(`${this.baseUrl}/add`, {
      idTypeReport,
      description,
      idService,
      idUser,
    });
  }
}
