import { User } from 'src/user/models/user';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeReport } from './type-report';

@Entity({ schema: 'public', name: 'reports' })
export class Reports {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  public description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['pending', 'in_progress', 'on_hold', 'resolve'],
    default: 'pending',
    nullable: false,
  })
  public status: 'pending' | 'in_progress' | 'on_hold' | 'resolve';

  @Column({ name: 'created_at', type: 'date', nullable: false })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  public updatedAt: Date;

  @Column({ name: 'resolved_at', type: 'date', nullable: false })
  public resolvedAt: Date;

  @Column({ name: 'id_user', type: 'varchar', nullable: false })
  public idUser: string;

  @Column({ name: 'id_admin', type: 'varchar', nullable: true })
  public idAdmin: string;

  @Column({
    name: 'priority',
    type: 'enum',
    enum: ['0', '1', '2', '3'],
    default: 0,
    nullable: false,
  })
  public priority: '0' | '1' | '2' | '3';

  @Column({ name: 'id_type_report', type: 'varchar', nullable: false })
  public idTypeReport: string;

  @ManyToOne(
    () => TypeReport,
    (objTypereport: TypeReport) => objTypereport.reportsTypeReport,
    { onUpdate: 'CASCADE', onDelete: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'id_type_report', referencedColumnName: 'uuid' }])
  public typeReportReport?: TypeReport;
  
  @ManyToOne(
    () => User,
    (objUser: User) => objUser.userReports,
    { onUpdate: 'CASCADE', onDelete: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'uuid' }])
  public reportsUsers?: User;
  
  @ManyToOne(
    () => User,
    (objUser: User) => objUser.adminReports,
    { onUpdate: 'CASCADE', onDelete: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'id_admin', referencedColumnName: 'uuid' }])
  public reportsAdmin?: User;
  
  
}
