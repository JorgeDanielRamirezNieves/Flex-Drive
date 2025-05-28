import { Injectable } from '@angular/core';
import { URL_NOTIFICATIONS } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public urlNotifications: string;
  constructor(private http: HttpClient) { 
    this.urlNotifications = URL_NOTIFICATIONS;
  }

  public getNotificationsByUser(uuid: string) {
    return this.http.get(`${this.urlNotifications}findByUser/${uuid}`);
  }
}
