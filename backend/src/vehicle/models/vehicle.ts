import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeSale } from './type_sale';
import { User } from 'src/user/models/user';
import { Tecnomecanic } from './tecnomecanic';
import { TecnicalDetails } from './tecnical-details';
import { Soat } from './soat';
import { Price } from 'src/prices/models/price';
import { Request } from 'src/requests/models/request';

export interface Imagesvehicle {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}
@Entity({ schema: 'public', name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'plate', type: 'varchar', length: 6, nullable: false })
  public plate: string;

  @Column({ name: 'licence_no', type: 'varchar', length: 50, nullable: false })
  public licenceNumber: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  public description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: [
      'available',
      'booked',
      'out_of_service',
      'in_use',
      'lost',
      'inactive',
    ],
  })
  public status:
    | 'available'
    | 'booked'
    | 'out_of_service'
    | 'in_use'
    | 'lost'
    | 'inactive';

  @Column({
    name: 'type',
    type: 'enum',
    enum: [
      'SUV',
      'sedan',
      'hatchback',
      'convertible',
      'pickup truck',
      'minivan',
      'luxury',
    ],
    nullable: false,
    default: 'SUV',
  })
  public type: string;

  @Column({ name: 'color', type: 'varchar', length: 20, nullable: false })
  public color: string;

  @Column({ name: 'mileage', type: 'int', nullable: false })
  public mileage: number;

  @Column({ name: 'conditions', type: 'text', nullable: false })
  public contitions: string;

  @Column('text', { name: 'accesories', array: true, nullable: false })
  public accesories: string[];

  @Column({ name: 'capacity', type: 'int', nullable: false })
  public capacity: number;

  @Column({ name: 'doors', type: 'int', nullable: false })
  public doors: number;

  @Column({ name: 'images', type: 'jsonb', nullable: false })
  public image: Imagesvehicle[];

  @Column({ name: 'availability', type: 'text', nullable: false })
  public availability: string;

  @Column({ name: 'rating', type: 'int', nullable: false })
  public rating: number;

  @Column({ name: 'home_delivery', type: 'bool', nullable: false })
  public homeDelivery: boolean;

  @Column({ name: 'created_at', type: 'date', nullable: false })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  public updatedAt: Date;

  @Column({ name: 'id_type_sale', type: 'varchar', nullable: false })
  public idTypeSale: string;

  @Column({ name: 'id_owner', type: 'varchar', nullable: false })
  public idOwner: string;

  @OneToMany(() => Tecnomecanic, (objRTM: Tecnomecanic) => objRTM.idVehicle)
  public TecnomecanicVehicle?: Tecnomecanic[];
  
  @OneToMany(() => Soat, (objSoat: Soat) => objSoat.idVehicle)
  public soatVehicle?: Soat[];
  
  @OneToMany(() => Price, (objPrice: Price) => objPrice.idVehicle)
  public pricesVehicle?: Price[];
  
  @OneToMany(() => Request, (objRequests: Request) => objRequests.idVehicle)
  public requestVehicle?: Request[];
  
  @OneToOne(() => TecnicalDetails, (objtechnicalDetails: TecnicalDetails) => objtechnicalDetails.idVehicle)
  public detailsVehicle?: TecnicalDetails;

  @ManyToOne(
    () => TypeSale,
    (objTypeSale: TypeSale) => objTypeSale.vehiclesTypeSale,
    {
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'id_type_sale', referencedColumnName: 'uuid' }])
  public typeSaleVehicle?: TypeSale;

  @ManyToOne(() => User, (objUser: User) => objUser.userVehicles, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_owner', referencedColumnName: 'uuid' }])
  public userVehicle?: User;

  constructor(
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
  ) {
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
  }
}
