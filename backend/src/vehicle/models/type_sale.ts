import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './vehicle';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'type_sale' })
export class TypeSale {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @ApiProperty({
    description: 'Name of the type sale',
    name: 'name',
    required: true,
  })
  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  public name: string;

  @OneToMany(() => Vehicle, (objVehicle: Vehicle) => objVehicle.idTypeSale)
  public vehiclesTypeSale?: Vehicle[];

  constructor(name: string) {
    this.name = name;
  }
}
