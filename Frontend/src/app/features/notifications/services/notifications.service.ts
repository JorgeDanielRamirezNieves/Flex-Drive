import { Injectable } from '@angular/core';
import { URL_NOTIFICATIONS } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public urlNotifications: string;
  private token: any;
  constructor(private http: HttpClient) { 
    this.urlNotifications = URL_NOTIFICATIONS;
    if (localStorage.getItem('authToken')) {
      this.token = localStorage.getItem('authToken');
    }
  }

  public getNotificationsByUser(uuid: string) {    
    return this.http.get(`${this.urlNotifications}findByUser/${uuid}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public createNotifications(objNotifiactions: Notification){
    return this.http.post(`${this.urlNotifications}add`, objNotifiactions, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
