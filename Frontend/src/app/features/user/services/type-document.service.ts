import { Injectable } from '@angular/core';
import { URL_TYPE_DOCUMENT } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {
  public urlTypeDocument: string;
  constructor(private http: HttpClient) {
    this.urlTypeDocument = URL_TYPE_DOCUMENT;
   }

  public getTypeDocument() {
    return this.http.get(this.urlTypeDocument + 'findAll');
  }
}
