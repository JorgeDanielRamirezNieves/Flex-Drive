import { URL_GENERATE_OTP, URL_VALIDATE_OTP } from './../../core/domains';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_COUNTRY_STATE, URL_IMAGES } from '../../core/domains';
import { API_KEY_COUNTRY_STATE, API_KEY_MOCKAROO } from '../../core/envirioment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  private urlUploadImage: string;
  private urlCountry: string;
  private readonly apiKeyCountryState: string;
  private readonly apiKeyMockaroo: string;
  private readonly urlGenearteOTP: string;
  private readonly urlValidateOTP: string;


  constructor(private http: HttpClient) {
    this.urlUploadImage = URL_IMAGES;
    this.urlCountry = URL_COUNTRY_STATE;
    this.apiKeyCountryState = API_KEY_COUNTRY_STATE;
    this.apiKeyMockaroo = API_KEY_MOCKAROO
    this.urlGenearteOTP = URL_GENERATE_OTP;
    this.urlValidateOTP = URL_VALIDATE_OTP;
  }

  public getAllCountries() {
    return this.http.get<Country[]>(this.urlCountry + 'countries', {
      headers: {
        'X-CSCAPI-KEY': this.apiKeyCountryState,
      },
    });
  }

  public UploadedFile(formData: FormData) {
    return this.http.post<any>(this.urlUploadImage, formData);
  }

  public getTestVehicle() {
    return this.http.get<any>('https://my.api.mockaroo.com/vehicle.json?key=' + this.apiKeyMockaroo);
  }
  
  public getTestDetailsVehicle() {
    return this.http.get<any>('https://my.api.mockaroo.com/details.json?key=' + this.apiKeyMockaroo);
  }
  
  public getTestRTM() {
    return this.http.get<any>('https://my.api.mockaroo.com/rtm.json?key=' + this.apiKeyMockaroo);
  }
  
  public getTestSoat() {
    return this.http.get<any>('https://my.api.mockaroo.com/soat.json?key=' + this.apiKeyMockaroo);
  }

  public generateOTP() {
    return this.http.get<any>( this.urlGenearteOTP);
  }

  public validateOTP(otp: string) {
    return this.http.post<any>(this.urlValidateOTP, { otp: otp });
  }
}
