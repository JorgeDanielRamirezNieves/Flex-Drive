import { Injectable } from '@angular/core';
import { URL_PREFERENCE } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '../models/preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  public urlPreferences: string;
  constructor(private http: HttpClient) {
    this.urlPreferences = URL_PREFERENCE;
  }

  public getPreferencesUser(uuidUser: string) {
    return this.http.get(this.urlPreferences + 'findByUser/' + uuidUser, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
  }

  public updatePreferencesUser(uuidUser: string, preferences: Preferences) {
    return this.http.put(
      this.urlPreferences + 'update/' + uuidUser,
      preferences,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
  }

  public createPreferencesUser(preferences: Preferences) {
    return this.http.post(this.urlPreferences + 'add/', preferences, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
  }
}
