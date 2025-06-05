import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';
import { URL_REPORT } from '../../../core/domains';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private baseUrl: string;
  private token: any;
  constructor(private http: HttpClient) {
    this.baseUrl = URL_REPORT;
    if (localStorage.getItem('authToken')) {
      this.token = localStorage.getItem('authToken');
    }
  }

  getAllReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/findAll`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  postReport(
    idTypeReport: string,
    description: string,
    idService: string | null,
    idUser: string
  ): Observable<Report> {
    return this.http.post<Report>(
      `${this.baseUrl}/add`,
      {
        idTypeReport,
        description,
        idService,
        idUser,
      },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
}
