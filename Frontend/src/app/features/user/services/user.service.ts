import { Injectable } from '@angular/core';
import { URL_USER } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string;
  constructor(private http: HttpClient) { 
    this.userUrl = URL_USER
  }

  getUserByUUID(uuid: string) {
    return this.http.get(this.userUrl + 'findOne/' + uuid);
  }
  
}
