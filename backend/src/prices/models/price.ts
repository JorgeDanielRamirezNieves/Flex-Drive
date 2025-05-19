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
  public precio: number;

  @Column({ name: 'start_date', type: 'date', nullable: false })
  public startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: false })
  public endDate: Date;

  @Column({ name: 'id_vehicle', type: 'varchar', nullable: false })
  public idVehicle: string;

  @ManyToOne(() => Vehicle, (objVehicle: Vehicle) => objVehicle.prices, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_vehicle', referencedColumnName: 'uuid' })
  public vehicle?: Vehicle;

  constructor(
    uuid: string,
    precio: number,
    startDate: Date,
    endDate: Date,
    idVehicle: string,
  ) {
    this.uuid = uuid;
    this.precio = precio;
    this.startDate = startDate;
    this.endDate = endDate;
    this.idVehicle = idVehicle;
  }
}
