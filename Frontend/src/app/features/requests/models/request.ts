import { User } from "../../user/models/user";
import { Vehicle } from "../../vehicle/models/vehicle";

export class Request {
  public uuid: string;
  public sendDate: Date;
  public answerDate: Date;
  public deliveryDate: Date;
  public returnDate: Date;
  public description: string;
  public idClient: string;
  public idVehicle: string;
  public status: 'pending' | 'approved' | 'negotiating' | 'rejected';
  public requestUser?: User;
  public requestVehicle?: Vehicle;
  constructor(
    uuid: string,
    sendDate: Date,
    answerDate: Date,
    deliveryDate: Date,
    returnDate: Date,
    description: string,
    idClient: string,
    idVehicle: string,
    status: 'approved' | 'negotiating' | 'rejected'
  ) {
    this.uuid = uuid;
    this.sendDate = sendDate;
    this.answerDate = answerDate;
    this.deliveryDate = deliveryDate;
    this.returnDate = returnDate;
    this.description = description;
    this.idClient = idClient;
    this.idVehicle = idVehicle;
    this.status = status;
  }
}
