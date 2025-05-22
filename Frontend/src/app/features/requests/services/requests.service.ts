import { Injectable } from '@angular/core';
import { URL_REQUEST } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private urlRequests: string;
  constructor(private http: HttpClient) { 
    this.urlRequests = URL_REQUEST;
  }

  public getByClient(userUUID: string) {
    return this.http.get(`${this.urlRequests}findbyUser/${userUUID}`);
  }

  public getByOwner(ownerUUID: string) { 
    return this.http.get(`${this.urlRequests}findbyOwner/${ownerUUID}`);
  } 
}
