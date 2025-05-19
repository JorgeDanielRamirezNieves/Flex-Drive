import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vehicle } from './vehicle';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'tecnomecanic' })
export class Tecnomecanic {
  @PrimaryColumn({ name: 'no_certificate', type: 'varchar', length: 50 })
  public noCertificate: string;

  @ApiProperty({
    description: 'Status of the Tecnomecanic certificate',
    example: true,
  })
  @Column({ name: 'status', type: 'bool' })
  public status: boolean;

  @ApiProperty({
    description: 'Date of expedition of the Tecnomecanic certificate',
    example: '2023-10-01',
  })
  @Column({ name: 'expedition_date', type: 'date' })
  public expeditionDate: Date;

  @ApiProperty({
    description: 'Date of expiration of the Tecnomecanic certificate',
    example: '2024-10-01',
  })
  @Column({ name: 'expiration_date', type: 'date' })
  public expirationDate: Date;

  @ApiProperty({
    description: 'Entity that issued the Tecnomecanic certificate',
    example: 'CDA Ejemplo',
  })
  @Column({ name: 'entities', type: 'varchar', length: 50 })
  public entitie: string;

  @ApiProperty({
    description: 'UUID of the vehicle associated with the Tecnomecanic certificate',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
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
