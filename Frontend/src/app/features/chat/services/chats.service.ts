import { HttpClient } from '@angular/common/http';
import { URL_CHAT } from './../../../core/domains';
import { Injectable } from '@angular/core';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  private urlChat; 
  constructor(private http: HttpClient) {
    this.urlChat = URL_CHAT; 
  }

  public getAllChats(userUUID: string) {
    return this.http.get(`${this.urlChat}findByUserUUID/${userUUID}`);
  }

  public createChat(chat: Chat) {
    return this.http.post(`${this.urlChat}add`, chat);
  }

  public changeStatusChat(chatUUID: string, status: boolean) {
    return this.http.patch(`${this.urlChat}changeStatus`, {uuid: chatUUID, status: status});
  }

}
