import { Request } from '../../requests/models/request';
import { Message } from './message';

export class Chat {
  public uuid?: string;
  public createdAt: Date;
  public idrequest: string;
  public status: boolean;
  public request?: Request;
  public chatMessage?: Message[];

  constructor(
    createdAt: Date,
    idrequest: string,
    status: boolean,
    uuid?: string,
  ) {
    this.uuid = uuid;
    this.createdAt = createdAt;
    this.idrequest = idrequest;
    this.status = status;
  }
}
