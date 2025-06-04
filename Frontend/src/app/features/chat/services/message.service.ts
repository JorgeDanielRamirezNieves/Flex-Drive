import { HttpClient } from '@angular/common/http';
import { Message } from './../models/message';
import { URL_MESSAGE } from './../../../core/domains';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private urlMessage: string;
  constructor(private httpClient: HttpClient) { 
    this.urlMessage = URL_MESSAGE;
  }

  public createMessage(message: Message) {
    return this.httpClient.post<Message>(this.urlMessage + 'add', message);
  }

  public changeStatusMessage(uuid: string, status: boolean) {
    return this.httpClient.patch<Message>(this.urlMessage + 'changeStatus', { uuid:uuid, status:status });  
  }
  
  public changeDescriptionMessage(uuid: string, description: string) {
    return this.httpClient.patch<Message>(this.urlMessage + 'changeDescription', { uuid:uuid, description:description });  
  }
}
