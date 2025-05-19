import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vehicle } from './vehicle';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'soat' })
export class Soat {
  @PrimaryColumn({ name: 'no_policy', type: 'varchar', length: 50 })
  public noPolicy: string;

  @Column({ name: 'status', type: 'bool' })
  @ApiProperty({
    description: 'Status of the SOAT certificate',
    example: true,
    type: Boolean,
  })
  public status: boolean;

  @Column({ name: 'expedition_date', type: 'date' })
  @ApiProperty({
    description: 'Date of expedition of the SOAT certificate',
    example: '2023-10-01',
    type: Date,
  })
  public expeditionDate: Date;

  @Column({ name: 'start_date', type: 'date' })
  @ApiProperty({
    description: 'Date of start of the SOAT certificate',
    example: '2023-10-01',
    type: Date,
  })
  public startDate: Date;

  @Column({ name: 'finish_date', type: 'date' })
  @ApiProperty({
    description: 'Date of finish of the SOAT certificate',
    example: '2024-10-01',
    type: Date,
  })
  public finishDate: Date;

  @Column({ name: 'entities', type: 'varchar', length: 50 })
  @ApiProperty({
    description: 'Entity that issued the SOAT certificate',
    example: 'SOAT Ejemplo',
    type: String,
  })
  public entitie: string;

  @Column({ name: 'id_vehicle', type: 'varchar' })
  @ApiProperty({
    description: 'UUID of the vehicle associated with the SOAT certificate',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  public idVehicle: string;

  @ManyToOne(
    () => Vehicle,
    (objVehicle: Vehicle) => objVehicle.soatVehicle,
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
