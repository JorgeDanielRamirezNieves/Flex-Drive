import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vehicle } from './vehicle';

@Entity({ schema: 'public', name: 'soat' })
export class Soat {
  @PrimaryColumn({ name: 'no_policy', type: 'varchar', length: 50 })
  public noPolicy: string;

  @Column({ name: 'status', type: 'bool' })
  public status: boolean;

  @Column({ name: 'expedition_date', type: 'date' })
  public expeditionDate: Date;

  @Column({ name: 'start_date', type: 'date' })
  public startDate: Date;

  @Column({ name: 'finish_date', type: 'date' })
  public finishDate: Date;

  @Column({ name: 'entities', type: 'varchar', length: 50 })
  public entitie: string;

  @Column({ name: 'id_vehicle', type: 'varchar' })
  public idVehicle: string;

  @ManyToOne(
    () => Vehicle,
    (objVehicle: Vehicle) => objVehicle.TecnomecanicVehicle,
    {
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'id_vehicle', referencedColumnName: 'uuid' }])
  public vehicleSoat?: Vehicle;

  constructor(
    noPolicy: string,
    status: boolean,
    expeditionDate: Date,
    startDate: Date,
    finishDate: Date,
    entitie: string,
    idVehicle: string,
  ) {
    this.noPolicy = noPolicy;
    this.status = status;
    this.expeditionDate = expeditionDate;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.entitie = entitie;
    this.idVehicle = idVehicle;
  }
}
