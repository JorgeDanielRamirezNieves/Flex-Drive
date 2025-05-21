import { User } from './user';

export interface configurations {
  notifications: boolean;
  theme: boolean;
  mails: boolean;
  language: boolean;
  deleteChats: boolean;
}

export interface paramters {
  class: string;
  color: string;
  mileage: number;
  accessories: string[]; // checkbox per each accessory
  capacity: number;
  year: string;
  price: number;
  brand: string;
  model: string;
}

export class Preferences {
  public uuid: string;
  public idUser: string;
  public configurations: configurations;
  public paramters: paramters;
  public user?: User;
  constructor(
    uuid: string,
    idUser: string,
    configuration: configurations,
    paramters: paramters
  ) {
    this.uuid = uuid;
    this.idUser = idUser;
    this.configurations = configuration;
    this.paramters = paramters;
  }
}
