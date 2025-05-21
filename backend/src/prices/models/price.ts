import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from 'src/vehicle/models/vehicle';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'public', name: 'history_prices' })
export class Price {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'price', type: 'int', nullable: false })
  @ApiProperty({
    type: Number,
    description: 'Price of the vehicle',
    example: 150000
  })
  public price: number;

  @Column({ name: 'start_date', type: 'date', nullable: false })
  @ApiProperty({
    type: Date,
    description: 'Start date of the price',
    example: '2023-01-01',
  })
  public startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: false })
  @ApiProperty({
    type: Date,
    description: 'End date of the price',
    example: '2023-12-31',
  })
  public endDate: Date;

  @Column({ name: 'id_vehicle', type: 'varchar', nullable: false })
  @ApiProperty({
    type: String,
    description: "Vehicle's ID",
    required: true,
    example: 'cd107cdd-b494-46ce-8c89-3eb7c78246b5',
  })
  public idVehicle: string;

  @ManyToOne(() => Vehicle, (objVehicle: Vehicle) => objVehicle.prices, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_vehicle', referencedColumnName: 'uuid' })
  public vehicle?: Vehicle;

  constructor(
    uuid: string,
    price: number,
    startDate: Date,
    endDate: Date,
    idVehicle: string,
  ) {
    this.uuid = uuid;
    this.price = price;
    this.startDate = startDate;
    this.endDate = endDate;
    this.idVehicle = idVehicle;
  }
}
