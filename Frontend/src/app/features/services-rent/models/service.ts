import { Request } from "../../requests/models/request";

export class Service {
  public uuid: string;
  public status:
    | 'for_take'
    | 'on_travel'
    | 'reported'
    | 'for_recive'
    | 'finished';
  public createdAt: Date;
  public updatedAt: Date;
  public idRequest: string;
  public request?: Request;
    constructor(
    uuid: string,
    status: 'for_take' | 'on_travel' | 'reported' | 'for_recive' | 'finished',
    createdAt: Date,
    updatedAt: Date,
    idRequest: string,
  ) {
    this.uuid = uuid;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.idRequest = idRequest;
  }
}
