import { Injectable } from '@angular/core';
import { URL_REQUEST } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';
import { Request } from '../models/request';

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

  public createRequest(request: Request) {
    return this.http.post(`${this.urlRequests}add`, request);
  }

  public changeStatus(uuid: string, status: string) {
    return this.http.patch(`${this.urlRequests}changeStatus`, { uuid: uuid, status: status });
  }
}
