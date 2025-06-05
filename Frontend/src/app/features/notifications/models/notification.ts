import { User } from '../../user/models/user';
import { TypeNotification } from './type-notification';

export class Notification {
  public uuid?: string;
  public description: string;
  public createdAt: Date;
  public updatedAt: Date | null;
  public sendDate: Date;
  public seenDate: Date | null;
  public status: boolean;
  public idTypeNotification: string;
  public idUser: string;
  public idRelated?: string;
  public notificationUser?: User;
  public typeNotification?: TypeNotification;

    constructor(
        description: string,
        createdAt: Date,
        updatedAt: Date | null,
        sendDate: Date,
        seenDate: Date | null,
        status: boolean,
        idTypeNotification: string,
        idUser: string,
        uuid?: string,
    ) {
        this.uuid = uuid;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.sendDate = sendDate;
        this.seenDate = seenDate;
        this.status = status;
        this.idUser = idUser;
        this.idTypeNotification = idTypeNotification;
    }
}
