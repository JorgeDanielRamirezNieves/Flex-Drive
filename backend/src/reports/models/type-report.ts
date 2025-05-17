import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reports } from './reports';

@Entity({ schema: 'public', name: 'type_report' })
export class TypeReport {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  public name: string;

  @OneToMany(() => Reports, (objReport: Reports) => objReport.idTypeReport)
  public reportsTypeReport?: Reports[];

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}
