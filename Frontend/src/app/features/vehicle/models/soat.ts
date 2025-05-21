import { Vehicle } from "./vehicle";

export class Soat {
  public noPolicy: string;
  public status: boolean;
  public expeditionDate: Date;
  public startDate: Date;
  public finishDate: Date;
  public entitie: string;
  public idVehicle: string;
  public vehicle?: Vehicle;
  constructor(
    noPolicy: string,
    status: boolean,
    expeditionDate: Date,
    startDate: Date,
    finishDate: Date,
    entitie: string,
    idVehicle: string
  ) {
    this.noPolicy = noPolicy;
    this.status = status;
    this.expeditionDate = expeditionDate;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.entitie = entitie;
    this.idVehicle = idVehicle;
  }
}
