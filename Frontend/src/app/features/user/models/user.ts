import { Vehicle } from '../../vehicle/models/vehicle';
import { Role } from './role';
import { TypeDocument } from './type-document';
import { Fine } from './fine';
import { Request } from '../../requests/models/request';
import { Message } from '../../chat/models/message';
import { Notification } from '../../notifications/models/notification';

export class User {
  public uuid?: string;
  public noDocument: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public address: string;
  public city: string;
  public country: string;
  public createdAt: Date;
  public updatedAt: Date | null;
  public birthday: Date;
  public email: string;
  public password: string;
  public status: 'active' | 'inactive' | 'under_review';
  public rating: number;
  public image: string;
  public idRole: string;
  public idTypeDocument: string;
  public rolUser?: Role;
  public typeDocumentUser?: TypeDocument;
  public userVehicles?: Vehicle[];
  public userFines?: Fine[];
  public userReports?: Report[];
  public adminReports?: Report[];
  public userRequests?: Request[];
  public userMessageSender?: Message[];
  public userMessageReceiver?: Message[];
  public userNotifications?: Notification[];

    constructor(
        noDocument: string,
        firstName: string,
        lastName: string,
        phone: string,
        address: string,
        city: string,
        country: string,
        createdAt: Date,
        updatedAt: Date | null,
        birthday: Date,
        email: string,
        password: string,
        status: 'active' | 'inactive' | 'under_review',
        rating: number,
        image: string,
        idRole: string,
        idTypeDocument: string,
    ) {
        this.noDocument = noDocument;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.country = country;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.birthday = birthday;
        this.email = email;
        this.password = password;
        this.status = status;
        this.rating = rating;
        this.image = image;
        this.idRole = idRole;
        this.idTypeDocument = idTypeDocument;
    }
}
