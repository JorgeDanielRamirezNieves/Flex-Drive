import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reports } from './reports';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'public', name: 'type_report' })
export class TypeReport {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

    
  @Column({ name: 'name', type: 'varchar', nullable: false })
  @ApiProperty({
    description: 'Name of the type report',
    required: true,
    type: String,
  })
  public name: string;

  @OneToMany(() => Reports, (objReport: Reports) => objReport.idTypeReport)
  public reportsTypeReport?: Reports[];

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}
