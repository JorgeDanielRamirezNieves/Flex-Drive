import { Service } from "../../services-rent/models/service";
import { User } from "../../user/models/user";
import { Vehicle } from "../../vehicle/models/vehicle";

export class Request {
  public uuid?: string;
  public sendDate: Date;
  public answerDate: Date | null;
  public deliveryDate: Date;
  public returnDate: Date;
  public description: string;
  public idClient: string;
  public idVehicle: string;
  public status: 'pending' | 'approved' | 'negotiating' | 'rejected';
  public requestUser?: User;
  public requestVehicle?: Vehicle;
  public service?: Service;
  constructor(
    sendDate: Date,
    answerDate: Date | null,
    deliveryDate: Date,
    returnDate: Date,
    description: string,
    idClient: string,
    idVehicle: string,
    status:  'pending' | 'approved' | 'negotiating' | 'rejected',
    uuid?: string
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
