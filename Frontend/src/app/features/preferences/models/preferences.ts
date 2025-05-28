import { User } from '../../user/models/user';

export interface configurations {
  notifications: boolean;
  theme: boolean;
  mails: boolean;
  language: boolean;
  deleteChats: boolean;
}


export interface Parameters {    //Each parameter is an array, because the user can select multiple options
  class:string[];
  color:string[];
  mileage:number[];         // PROPOSAL: mileage: { min: number; max: number };
  capacity: number[];       // PROPOSAL: capacity: { min: number; max: number };
  brand: string[];
  model: string[];
  
  accessories:string[];     // checkbox per each accessory
  fuelType: string[];       // PROPOSAL: (petrol, diesel, electric, hybrid);
  price: number[];
  rating: number[];         // PROPOSAL: rating: { min: number; max: number };
  year: string[];
  insurance: boolean;       // PROPOSAL: (yes, no);

  /* SCALABILITY PROPOSALS:
  MÉTODOS DE PAGO ACEPTADOS (STRING ARRAY)
  */
}

export class Preferences {
  public uuid?: string;
  public idUser: string;
  public configurations: configurations;
  public parameters: Parameters;
  public user?: User;
  constructor(
    idUser: string,
    configuration: configurations,
    paramters: Parameters
  ) {
    this.idUser = idUser;
    this.configurations = configuration;
    this.parameters = paramters;
  }
}
