import { Injectable } from '@angular/core';
import { URL_USER } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string;
  constructor(private http: HttpClient) { 
    this.userUrl = URL_USER
  }

  public getUserByUUID(uuid: string) {
    return this.http.get(this.userUrl + 'findOne/' + uuid);
  }
  
  public createUser(objUser: User){
    return this.http.post<any>(this.userUrl + 'add', objUser);
  } 

}
