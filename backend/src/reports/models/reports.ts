import { User } from 'src/user/models/user';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeReport } from './type-report';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceRent } from 'src/services-rent/models/serviceRent';

@Entity({ schema: 'public', name: 'reports' })
export class Reports {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @ApiProperty({
    description: 'Title of the report',
    example: 'Report Title',
    type: String,
  })
  @Column({ name: 'description', type: 'text', nullable: false })
  public description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['pending', 'in_progress', 'on_hold', 'resolve'],
    default: 'pending',
    nullable: false,
  })
  @ApiProperty({
    description: 'Status of the report',
    example: 'pending',
    type: String,
    enum: ['pending', 'in_progress', 'on_hold', 'resolve'],
  })
  public status: 'pending' | 'in_progress' | 'on_hold' | 'resolve';

  @ApiProperty({
    description: 'Date of creation of the report',
    example: '2023-10-01',
    type: Date,
  })
  @Column({
    name: 'created_at',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Date of update of the report',
    example: '2023-10-01',
    type: Date,
  })
  @Column({
    name: 'updated_at',
    type: 'date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;

  @ApiProperty({
    description: 'Date of resolution of the report',
    example: '2023-10-01',
    type: Date,
  })
  @Column({ name: 'resolved_at', type: 'date', nullable: true })
  public resolvedAt: Date;

  @ApiProperty({
    description: 'ID of the user who created the report',
    example: '1234567890',
    type: String,
  })
  @Column({ name: 'id_user', type: 'varchar', nullable: false })
  public idUser: string;

  @ApiProperty({
    description: 'ID of the admin who resolved the report',
    example: '1234567890',
    type: String,
  })
  @Column({ name: 'id_admin', type: 'varchar', nullable: true })
  public idAdmin: string;

  @ApiProperty({
    description: 'Priority of the report',
    example: '0',
    enum: ['0', '1', '2', '3'],
    type: String,
  })
  @Column({
    name: 'priority',
    type: 'enum',
    enum: ['0', '1', '2', '3'],
    default: 0,
    nullable: false,
  })
  public priority: '0' | '1' | '2' | '3';

  @ApiProperty({
    description: 'ID of the type of report',
    example: '1234567890',
    type: String,
  })
  @Column({ name: 'id_type_report', type: 'varchar', nullable: false })
  public idTypeReport: string;

  @ApiProperty({
    description: 'ID of the type service',
    example: '1234567890',
    type: String,
  })
  @Column({ name: 'id_service', type: 'varchar', nullable: true })
  public idService: string;

  @OneToOne(() => ServiceRent, (objRent: ServiceRent) => objRent.uuid)
  @JoinColumn({ name: 'id_service', referencedColumnName: 'uuid' })
  public ServiceRent: ServiceRent;

  @ManyToOne(
    () => TypeReport,
    (objTypereport: TypeReport) => objTypereport.reportsTypeReport,
    { onUpdate: 'CASCADE', onDelete: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'id_type_report', referencedColumnName: 'uuid' }])
  public typeReport?: TypeReport;

  @ManyToOne(() => User, (objUser: User) => objUser.userReports, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'uuid' }])
  public reportsUsers?: User;

  @ManyToOne(() => User, (objUser: User) => objUser.adminReports, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_admin', referencedColumnName: 'uuid' }])
  public reportsAdmin?: User;

  constructor(
    uuid: string,
    description: string,
    status: 'pending' | 'in_progress' | 'on_hold' | 'resolve',
    createdAt: Date,
    updatedAt: Date,
    resolvedAt: Date,
    idUser: string,
    idAdmin: string,
    priority: '0' | '1' | '2' | '3',
    idTypeReport: string,
    idService: string,
  ) {
    this.uuid = uuid;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.resolvedAt = resolvedAt;
    this.idUser = idUser;
    this.idAdmin = idAdmin;
    this.priority = priority;
    this.idTypeReport = idTypeReport;
    this.idService = idService;
  }
}
