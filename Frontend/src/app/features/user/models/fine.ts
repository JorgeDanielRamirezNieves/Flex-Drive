import { User } from './user';

export class Fine {
  public uuid: string;
  public noFine: string;
  public status: boolean;
  public fineDate: Date;
  public infractionCode: string;
  public infractionDescription: string;
  public entitie: string;
  public noResolution: string;
  public idUser: string;
  public finesUser?: User;

  constructor(
    uuid: string,
    noFine: string,
    status: boolean,
    fineDate: Date,
    infractionCode: string,
    infractionDescription: string,
    entitie: string,
    noResolution: string,
    idUser: string
  ) {
    this.uuid = uuid;
    this.noFine = noFine;
    this.status = status;
    this.fineDate = fineDate;
    this.infractionCode = infractionCode;
    this.infractionDescription = infractionDescription;
    this.entitie = entitie;
    this.noResolution = noResolution;
    this.idUser = idUser;
  }
}
