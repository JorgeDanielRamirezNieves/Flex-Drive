import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role';
import { TypeDocument } from './type-document';
import { Vehicle } from 'src/vehicle/models/vehicle';
import { Fines } from './fines';

@Entity({ schema: 'public', name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'no_document', type: 'varchar', length: 20, nullable: false })
  public noDocument: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: false })
  public firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: false })
  public lastName: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
  public phone: string;

  @Column({ name: 'address', type: 'varchar', length: 50, nullable: false })
  public address: string;

  @Column({ name: 'city', type: 'varchar', length: 50, nullable: false })
  public city: string;

  @Column({ name: 'country', type: 'varchar', length: 50, nullable: false })
  public country: string;

  @Column({ name: 'created_at', type: 'date', nullable: false })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  public updatedAt: Date;
  
  @Column({ name: 'birthday', type: 'date', nullable: false })
  public birthday: Date;

  @Column({ name: 'email', type: 'varchar', length: 50, nullable: false })
  public email: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['active', 'inactive', 'under_review'],
    default: 'active',
  })
  public status: 'active' | 'inactive' | 'under_review';

  @Column({
    name: 'rating',
    type: 'int',
    nullable: false,
    default: 0,
  })
  public rating: number;

  @Column({ name: 'image', type: 'varchar', length: 255 })
  public image: string;

  @Column({ name: 'id_role', type: 'varchar', nullable: false })
  public idRole: string;

  @Column({
    name: 'id_type_document',
    type: 'varchar',
    nullable: false,
  })
  public idTypeDocument: string;

  @ManyToOne(() => Role, (objRol: Role) => objRol.usersRole, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_role', referencedColumnName: 'uuid' }])
  public rolUser?: Role;

  @ManyToOne(
    () => TypeDocument,
    (objTypeDocument: TypeDocument) => objTypeDocument.usersTypeDocument,
    { onUpdate: 'CASCADE', onDelete: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'id_type_document', referencedColumnName: 'uuid' }])
  public typeDocumentUser?: TypeDocument;

  @OneToMany(() => Vehicle, (objVehicle: Vehicle) => objVehicle.idOwner)
  public userVehicles?: Vehicle[];
  
  @OneToMany(() => Fines, (objfine: Fines) => objfine.idUser)
  public userFines?: Fines[];
  
  constructor(
    noDocument: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    createdAt: Date,
    updatedAt: Date,
    email: string,
    status: 'active' | 'inactive' | 'under_review',
    rating: number,
    image: string,
    idRole: string,
    idTypeDocument: string,
    uuid?: string
  ) {
    this.noDocument = noDocument;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.country = country;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.email = email;
    this.status = status;
    this.rating = rating;
    this.image = image;
    this.idRole = idRole;
    this.idTypeDocument = idTypeDocument;
    this.uuid = uuid || '';
  }
}
