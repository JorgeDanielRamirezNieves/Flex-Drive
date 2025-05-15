import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ schema: 'public', name: 'fines' })
export class Fines {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'no_fine', type: 'varchar', length: 50, nullable: false })
  public noFine: string;

  @Column({ name: 'status', type: 'bool', nullable: false })
  public status: boolean;

  @Column({ name: 'fine_date', type: 'date', nullable: false })
  public fineDate: Date;

  @Column({
    name: 'infraction_code',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public infractionCode: string;

  @Column({ name: 'infraction_description', type: 'text', nullable: false })
  public infractionDescription: string;

  @Column({ name: 'entitie', type: 'varchar', length: 50, nullable: false })
  public entitie: string;

  @Column({
    name: 'no_resolution',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public noResolution: string;

  @Column({ name: 'id_user', type: 'varchar', nullable: false })
  public idUser: string;

  @ManyToOne(() => User, (objUser: User) => objUser.userFines, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'uuid' }])
  public finesUser?: User;

  constructor(
    uuid: string,
    noFine: string,
    status: boolean,
    fineDate: Date,
    infractionCode: string,
    infractionDescription: string,
    entitie: string,
    noResolution: string,
    idUser: string,
  ) {
    this.uuid = uuid;
    this.noFine = noFine;
    this.status = status;
    this.fineDate = fineDate;
    this.infractionCode = infractionCode;
    this.infractionDescription = infractionDescription;
    this.entitie = entitie;
    this.noResolution = noResolution;
    this.idUser = idUser;
  }
}
