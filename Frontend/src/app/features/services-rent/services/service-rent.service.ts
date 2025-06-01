import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE_RENT } from '../../../core/domains';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceRentService {
  private urlServiceRent: string;
  constructor(private http: HttpClient) {
    this.urlServiceRent = URL_SERVICE_RENT;
  }

  public getServiceRentsByClientUUID(uuid: string) {
    return this.http.get(`${this.urlServiceRent}findByClient/${uuid}`);
  }
  public getServiceRentsByUUID(uuid: string) {
    return this.http.get(`${this.urlServiceRent}findOne/${uuid}`);
  }
  public createServiceRent(service: Service) {
    return this.http.post(`${this.urlServiceRent}add`, service);
  }
  public changeServiceRentStatus(uuid: string, status: string) {
    return this.http.patch(`${this.urlServiceRent}changeStatus`, { uuid:uuid, status: status });
  }
}
