import { Injectable } from '@angular/core';
import { URL_VEHICLE } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private urlVehicles: string
  constructor( private http: HttpClient) { 
    this.urlVehicles = URL_VEHICLE;
  }

  public getVehicles() {
    return this.http.get(this.urlVehicles + 'findAll');
  }
  public getVehicleByUUID(uuid: string) {
    return this.http.get(this.urlVehicles + 'findOne/' + uuid);
  }
  public getVehicleLimit(limit: number) {
    return this.http.get(this.urlVehicles + 'findWithLimit/' + limit);
  }
  public getVehicleMostRequested(limit: number) {
    return this.http.get(this.urlVehicles + 'findMostRequested/' + limit);
  }
  public getVehicleByUser(uuid: string) {
    return this.http.get(this.urlVehicles + 'findByUser/' + uuid);
  }
}
