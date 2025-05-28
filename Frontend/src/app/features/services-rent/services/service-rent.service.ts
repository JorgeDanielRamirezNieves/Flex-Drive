import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE_RENT } from '../../../core/domains';

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
}
