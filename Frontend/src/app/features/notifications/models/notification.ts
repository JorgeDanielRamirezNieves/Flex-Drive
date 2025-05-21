import { User } from '../../user/models/user';
import { TypeNotification } from './type-notification';

export class Notification {
  public uuid: string;
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;
  public sendDate: Date;
  public seenDate: Date;
  public status: boolean;
  public idTypeNotification: string;
  public notificationUser?: User;
  public typeNotification?: TypeNotification;

    constructor(
        uuid: string,
        description: string,
        createdAt: Date,
        updatedAt: Date,
        sendDate: Date,
        seenDate: Date,
        status: boolean,
        idTypeNotification: string,
    ) {
        this.uuid = uuid;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.sendDate = sendDate;
        this.seenDate = seenDate;
        this.status = status;
        this.idTypeNotification = idTypeNotification;
    }
}
