import { Injectable } from '@angular/core';
import { URL_VEHICLE } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private urlVehicles: string;
  constructor(private http: HttpClient) {
    this.urlVehicles = URL_VEHICLE;
  }

  public getVehicles() {
    return this.http.get(this.urlVehicles + 'findAll');
  }
  public getVehicleByUUID(uuid: string) {
    return this.http.get(this.urlVehicles + 'findOne/' + uuid);
  }
  public getVehicleByPlate(plate: string) {
    return this.http.get(this.urlVehicles + 'findbyPLate/' + plate);
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

  public createVehicle(vehicle: Vehicle) {
    return this.http.post(this.urlVehicles + 'add', vehicle);
  }

  public updateVehicle(vehicle: Vehicle) {
    return this.http.put(this.urlVehicles + 'update', vehicle);
  }

  public changeStatusVehicle(uuid: string, status: string) {
    return this.http.patch(this.urlVehicles + 'changeStatus', {
      uuid: uuid,
      status: status,
    });
  }
}
