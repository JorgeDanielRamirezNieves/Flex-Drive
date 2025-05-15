import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vehicle } from './vehicle';

@Entity({ schema: 'public', name: 'tecnomecanic' })
export class Tecnomecanic {
  @PrimaryColumn({ name: 'no_certificate', type: 'varchar', length: 50 })
  public noCertificate: string;

  @Column({ name: 'status', type: 'bool' })
  public status: boolean;

  @Column({ name: 'expedition_date', type: 'date' })
  public expeditionDate: Date;

  @Column({ name: 'expiration_date', type: 'date' })
  public expirationDate: Date;

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
  public vehicleTecnomecnic?: Vehicle;

  constructor(
    noCertificate: string,
    status: boolean,
    expeditionDate: Date,
    expirationDate: Date,
    entitie: string,
    idVehicle: string,
  ) {
    this.noCertificate = noCertificate;
    this.status = status;
    this.expeditionDate = expeditionDate;
    this.expirationDate = expirationDate;
    this.entitie = entitie;
    this.idVehicle = idVehicle;
  }
}
