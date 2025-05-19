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
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    type: String,
    description: 'Vehicle plate',
    example: 'ABC123',
  })
  @Column({ name: 'plate', type: 'varchar', length: 6, nullable: false })
  public plate: string;

  @ApiProperty({
    type: String,
    description: 'Vehicle licence number',
    example: 'LIC123456',
  })
  @Column({ name: 'licence_no', type: 'varchar', length: 50, nullable: false })
  public licenceNumber: string;

  @ApiProperty({
    type: String,
    description: 'Vehicle description',
    example: 'This is a great vehicle.',
  })
  @Column({ name: 'description', type: 'text', nullable: false })
  public description: string;

  @ApiProperty({
    type: String,
    description: 'Vehicle status',
    enum: [
      'available',
      'booked',
      'out_of_service',
      'in_use',
      'lost',
      'inactive',
    ],
  })
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
  @ApiProperty({
    type: String,
    description: 'Vehicle type',
    enum: [
      'SUV',
      'sedan',
      'hatchback',
      'convertible',
      'pickup truck',
      'minivan',
      'luxury',
    ],
  })
  public type: string;

  @ApiProperty({
    type: String,
    description: 'Vehicle color',
    example: 'Red',
  })
  @Column({ name: 'color', type: 'varchar', length: 20, nullable: false })
  public color: string;

  @ApiProperty({
    type: Number,
    description: 'Vehicle mileage',
    example: 15000,
  })
  @Column({ name: 'mileage', type: 'int', nullable: false })
  public mileage: number;

  @ApiProperty({
    type: String,
    description: 'Vehicle conditions',
    example: 'New',
  })
  @Column({ name: 'conditions', type: 'text', nullable: false })
  public contitions: string;

  @ApiProperty({
    type: [String],
    description: 'Vehicle accessories',
    example: ['GPS', 'Bluetooth'],
  })
  @Column('text', { name: 'accesories', array: true, nullable: false })
  public accesories: string[];

  @ApiProperty({
    type: Number,
    description: 'Vehicle capacity',
    example: 5,
  })
  @Column({ name: 'capacity', type: 'int', nullable: false })
  public capacity: number;

  @ApiProperty({
    type: Number,
    description: 'Vehicle doors',
    example: 4,
  })
  @Column({ name: 'doors', type: 'int', nullable: false })
  public doors: number;

  @ApiProperty({
    type: 'array',
    description: 'Vehicle images',
    items: {
      type: 'object',
      properties: {
        itemImageSrc: { type: 'string' },
        thumbnailImageSrc: { type: 'string' },
        alt: { type: 'string' },
        title: { type: 'string' },
      }
    },
    example: [
      {
        itemImageSrc: 'image1.jpg',
        thumbnailImageSrc: 'thumb1.jpg',
        alt: 'Image 1',
        title: 'Image 1',
      },
      {
        itemImageSrc: 'image2.jpg',
        thumbnailImageSrc: 'thumb2.jpg',
        alt: 'Image 2',
        title: 'Image 2',
      },
    ],
  })
  @Column({ name: 'images', type: 'jsonb', nullable: false })
  public image: Imagesvehicle[]; 

  @ApiProperty({
    type: String,
    description: 'Vehicle availability',
    example: 'Available for rent',
  })
  @Column({ name: 'availability', type: 'text', nullable: false })
  public availability: string;

  @ApiProperty({
    type: Number,
    description: 'Vehicle rating',
    example: 4.5,
  })
  @Column({ name: 'rating', type: 'int', nullable: false })
  public rating: number;

  @ApiProperty({
    type: Boolean,
    description: 'Home delivery option',
    example: true,
  })
  @Column({ name: 'home_delivery', type: 'bool', nullable: false })
  public homeDelivery: boolean;

  @ApiProperty({
    type: Date,
    description: 'Vehicle creation date',
    example: '2023-01-01T00:00:00Z',
  })
  @Column({ name: 'created_at', type: 'date', nullable: false })
  public createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Vehicle update date',
    example: '2023-01-01T00:00:00Z',
  })
  @Column({ name: 'updated_at', type: 'date', nullable: true })
  public updatedAt: Date;

  @ApiProperty({
    type: String,
    description: 'Vehicle type sale ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ name: 'id_type_sale', type: 'varchar', nullable: false })
  public idTypeSale: string;

  @ApiProperty({
    type: String,
    description: 'Vehicle owner ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ name: 'id_owner', type: 'varchar', nullable: false })
  public idOwner: string;
  

  @OneToMany(() => Tecnomecanic, (objRTM: Tecnomecanic) => objRTM.vehicleTecnomecnic)
  public TecnomecanicVehicle?: Tecnomecanic[];
  
  @OneToMany(() => Soat, (objSoat: Soat) => objSoat.vehicleSoat)
  public soatVehicle?: Soat[];
  
  @OneToMany(() => Price, (objPrice: Price) => objPrice.vehicle)
  public prices?: Price[];
  
  @OneToMany(() => Request, (objRequests: Request) => objRequests.idVehicle)
  public requestVehicle?: Request[];
  
  @OneToOne(() => TecnicalDetails, (objtechnicalDetails: TecnicalDetails) => objtechnicalDetails.vehicle)
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
  public ownerVehicle?: User;

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
