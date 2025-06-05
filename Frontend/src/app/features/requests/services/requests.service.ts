import { Injectable } from '@angular/core';
import { URL_REQUEST } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private urlRequests: string;
  private token: any;
  constructor(private http: HttpClient) {
    this.urlRequests = URL_REQUEST;
    if (localStorage.getItem('authToken')) {
      this.token = localStorage.getItem('authToken');
    }
  }

  public getByClient(userUUID: string) {
    return this.http.get(`${this.urlRequests}findbyUser/${userUUID}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public getByOwner(ownerUUID: string) {
    return this.http.get(`${this.urlRequests}findbyOwner/${ownerUUID}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public createRequest(request: Request) {
    return this.http.post(`${this.urlRequests}add`, request, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public updateRequest(request: Request) {
    return this.http.put(`${this.urlRequests}update/${request.uuid}`, request, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public changeStatus(uuid: string, status: string) {
    return this.http.patch(
      `${this.urlRequests}changeStatus`,
      {
        uuid: uuid,
        status: status,
      },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
}
