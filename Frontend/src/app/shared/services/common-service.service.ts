import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_COUNTRY_STATE, URL_IMAGES } from '../../core/domains';
import { API_KEY_COUNTRY_STATE } from '../../core/envirioment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  private urlUploadImage: string;
  private urlCountry: string;
  private readonly apiKeyCountryState: string;

  constructor(private http: HttpClient) {
    this.urlUploadImage = URL_IMAGES;
    this.urlCountry = URL_COUNTRY_STATE;
    this.apiKeyCountryState = API_KEY_COUNTRY_STATE;
  }

  public getAllCountries() {
    return this.http.get<Country[]>(this.urlCountry + 'countries', {
      headers: {
        'X-CSCAPI-KEY': this.apiKeyCountryState,
      },
    });
  }

  public UploadedFile(formData: FormData) {
    return this.http.post<any>(this.urlUploadImage, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

}
