import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE_RENT } from '../../../core/domains';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class ServiceRentService {
  private urlServiceRent: string;
  private token: any;
  constructor(private http: HttpClient) {
    this.urlServiceRent = URL_SERVICE_RENT;
    if (localStorage.getItem('authToken')) {
      this.token = localStorage.getItem('authToken');
    }
  }

  public getServiceRentsByClientUUID(uuid: string) {
    return this.http.get(`${this.urlServiceRent}findByClient/${uuid}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  public getServiceRentsByUUID(uuid: string) {
    return this.http.get(`${this.urlServiceRent}findOne/${uuid}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  public createServiceRent(service: Service) {
    return this.http.post(`${this.urlServiceRent}add`, service, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  public changeServiceRentStatus(uuid: string, status: string) {
    return this.http.patch(
      `${this.urlServiceRent}changeStatus`,
      { uuid: uuid, status: status },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
}
