import { Request } from "../../requests/models/request";

export class Service {
  public uuid?: string;
  public status:
    | 'for_take'
    | 'on_travel'
    | 'reported'
    | 'for_recive'
    | 'finished';
  public createdAt: Date;
  public updatedAt: Date | null;
  public idRequest: string;
  public request?: Request;
    constructor(
      status: 'for_take' | 'on_travel' | 'reported' | 'for_recive' | 'finished',
      createdAt: Date,
      updatedAt: Date,
      idRequest: string,
      uuid?: string,
  ) {
    this.uuid = uuid;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.idRequest = idRequest;
  }
}
