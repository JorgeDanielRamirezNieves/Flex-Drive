import { Request } from "../../requests/models/request";
import { User } from "../../user/models/user";
import { Price } from "./price";
import { Soat } from "./soat";
import { TecnicalDetails } from "./tecnical-details";
import { Tecnomecanic } from "./tecnomecanic";
import { TypeSale } from "./type-sale";

export interface Imagesvehicle {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

export class Vehicle {
  public uuid: string;
  public plate: string;
  public licenceNumber: string;
  public description: string;
  public status:
    | 'available'
    | 'booked'
    | 'out_of_service'
    | 'in_use'
    | 'lost'
    | 'inactive';
  public type: string;
  public color: string;
  public mileage: number;
  public contitions: string;
  public accesories: string[];
  public capacity: number;
  public doors: number;
  public image: Imagesvehicle[];
  public availability: string;
  public rating: number;
  public homeDelivery: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public idTypeSale: string;
  public idOwner: string;
  public TecnomecanicVehicle?: Tecnomecanic[];
  public prices?: Price[];
  public soatVehicle?: Soat[];
  public requestVehicle?: Request[];
  public detailsVehicle?: TecnicalDetails;
  public typeSaleVehicle?: TypeSale;
  public ownerVehicle?: User;

    constructor(
        uuid: string,
        plate: string,
        licenceNumber: string,
        description: string,
        status:
        | 'available'
        | 'booked'
        | 'out_of_service'
        | 'in_use'
        | 'lost'
        | 'inactive',
        type: string,
        color: string,
        mileage: number,
        contitions: string,
        accesories: string[],
        capacity: number,
        doors: number,
        image: Imagesvehicle[],
        availability: string,
        rating: number,
        homeDelivery: boolean,
        createdAt: Date,
        updatedAt: Date,
        idTypeSale: string,
        idOwner: string
    ) {
        this.uuid = uuid;
        this.plate = plate;
        this.licenceNumber = licenceNumber;
        this.description = description;
        this.status = status;
        this.type = type;
        this.color = color;
        this.mileage = mileage;
        this.contitions = contitions;
        this.accesories = accesories;
        this.capacity = capacity;
        this.doors = doors;
        this.image = image;
        this.availability = availability;
        this.rating = rating;
        this.homeDelivery = homeDelivery;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.idTypeSale = idTypeSale;
        this.idOwner = idOwner;
    }
}
