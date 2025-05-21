import { Injectable } from '@angular/core';
import { URL_PREFERENCE } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  public urlPreferences: string
  constructor(private http: HttpClient) {
    this.urlPreferences = URL_PREFERENCE
   }

  public getPreferencesUser(uuidUser: string) {
    return this.http.get(this.urlPreferences + 'findByUser/' + uuidUser);
  }
   
}
