import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'tecnical_details' })
export class TecnicalDetails {
  @PrimaryGeneratedColumn('uuid')
  public idDetails: string;

  @Column({
    name: 'id_vehicle',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  @ApiProperty({
    description: 'UUID of the vehicle associated with the technical details',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public idVehicle: string;

  @Column({
    name: 'service_type',
    type: 'enum',
    enum: ['private', 'public'],
    nullable: false,
  })
  @ApiProperty({
    description: 'Type of service of the vehicle',
    enum: ['private', 'public'],
    example: 'private',
    type: String,
  })
  public serviceType: 'private' | 'public';

  @Column({ name: 'brand', type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: 'Brand of the vehicle',
    example: 'Toyota',
    type: String,
  })
  public brand: string;

  @Column({ name: 'model', type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: 'Model of the vehicle',
    example: 'Corolla',
    type: String,
  })
  public model: string;

  @Column({ name: 'year', type: 'varchar', length: 4, nullable: false })
  @ApiProperty({
    description: 'Year of manufacture of the vehicle',
    example: '2023',
    type: String,
  })
  public year: string;

  @Column({
    name: 'cylinder_capacity',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @ApiProperty({
    description: 'Cylinder capacity of the vehicle',
    example: '2000',
    type: String,
  })
  public cylinderCapacity: string;

  @Column({
    name: 'fuel_type',
    type: 'enum',
    enum: ['gasoline', 'diesel', 'electric', 'hybrid', 'biofuel'],
    nullable: false,
  })
  @ApiProperty({
    description: 'Type of fuel used by the vehicle',
    example: 'gasoline',
    enum: ['gasoline', 'diesel', 'electric', 'hybrid', 'biofuel'],
    type: String,
  })
  public fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'biofuel';

  @Column({ name: 'weight', type: 'varchar', length: 50, nullable: false })
  public weight: string;

  @Column({
    name: 'load_capacity',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @ApiProperty({
    description: 'Load capacity of the vehicle',
    example: '1000',
    type: String,
  })
  public loadCapacity: string;

  @Column({
    name: 'chassis_number',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @ApiProperty({
    description: 'Chassis number of the vehicle',
    example: 'ABC1234567890',
    type: String,
  })
  public noChassis: string;

  @OneToOne(() => Vehicle, (vehicle: Vehicle) => vehicle.detailsVehicle)
  @JoinColumn({ name: 'id_vehicle', referencedColumnName: 'uuid' })
  public vehicle?: Vehicle; 

  constructor(
    idDetails: string,
    idVehicle: string,
    serviceType: 'private' | 'public',
    brand: string,
    model: string,
    year: string,
    cylinderCapacity: string,
    fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'biofuel',
    weight: string,
    loadCapacity: string,
    noChassis: string,
  ) {
    this.idDetails = idDetails;
    this.idVehicle = idVehicle;
    this.serviceType = serviceType;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.cylinderCapacity = cylinderCapacity;
    this.fuelType = fuelType;
    this.weight = weight;
    this.loadCapacity = loadCapacity;
    this.noChassis = noChassis;
  }
}
