import { HttpClient } from '@angular/common/http';
import { URL_CHAT } from './../../../core/domains';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  public urlChat; 
  constructor(private http: HttpClient) {
    this.urlChat = URL_CHAT; 
  }

  getAllChats(userUUID: string) {
    return this.http.get(`${this.urlChat}/findByUserUUID${userUUID}`);
  }

}
