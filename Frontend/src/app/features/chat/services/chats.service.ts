import { HttpClient } from '@angular/common/http';
import { URL_CHAT } from './../../../core/domains';
import { Injectable } from '@angular/core';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private urlChat;
  private token: any;
  constructor(private http: HttpClient) {
    this.urlChat = URL_CHAT;
    if (localStorage.getItem('authToken')) {
      this.token = localStorage.getItem('authToken');
    }
  }

  public getAllChats(userUUID: string) {
    return this.http.get(`${this.urlChat}findByUserUUID/${userUUID}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public createChat(chat: Chat) {
    return this.http.post(`${this.urlChat}add`, chat, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public changeStatusChat(chatUUID: string, status: boolean) {
    return this.http.patch(
      `${this.urlChat}changeStatus`,
      { uuid: chatUUID, status: status },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
}
