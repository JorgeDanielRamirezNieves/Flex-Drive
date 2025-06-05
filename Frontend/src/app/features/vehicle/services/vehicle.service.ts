import { Injectable } from '@angular/core';
import { URL_VEHICLE } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../models/vehicle';
import { Parameters } from '../../preferences/models/preferences';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private urlVehicles: string;
  private token: any;
  constructor(private http: HttpClient) {
    this.urlVehicles = URL_VEHICLE;
    if (localStorage.getItem('authToken')) {
      this.token = localStorage.getItem('authToken');
    }
  }

  public getVehicles() {
    return this.http.get(this.urlVehicles + 'findAll', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  public getVehicleByUUID(uuid: string) {
    return this.http.get(this.urlVehicles + 'findOne/' + uuid, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  public getVehicleByPlate(plate: string) {
    return this.http.get(this.urlVehicles + 'findbyPLate/' + plate, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  public getVehicleLimit(limit: number) {
    return this.http.get(this.urlVehicles + 'findWithLimit/' + limit);
  }
  public getVehicleMostRequested(limit: number) {
    return this.http.get(this.urlVehicles + 'findMostRequested/' + limit);
  }
  public getVehicleByUser(uuid: string) {
    return this.http.get(this.urlVehicles + 'findByUser/' + uuid, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public getVehicleByPreferences(objParams: Parameters) {
    return this.http.post(this.urlVehicles + 'findPreferedByUser', objParams, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public searchVehicles(objParams: Parameters, newTags: string) {
    return this.http.post(
      this.urlVehicles + 'search',
      {
        parameters: objParams,
        tags: newTags,
      },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
  }

  public createVehicle(vehicle: Vehicle) {
    return this.http.post(this.urlVehicles + 'add', vehicle, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public getBrands() {
    return this.http.get(this.urlVehicles + 'findBrands/5');
  }

  public updateVehicle(vehicle: Vehicle) {
    return this.http.put(this.urlVehicles + 'update', vehicle, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public changeStatusVehicle(uuid: string, status: string) {
    return this.http.patch(
      this.urlVehicles + 'changeStatus',
      {
        uuid: uuid,
        status: status,
      },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
}
