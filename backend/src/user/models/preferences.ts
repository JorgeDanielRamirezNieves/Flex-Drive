import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

export interface configurations {
  notifications: boolean;
  theme: boolean;
  mails: boolean;
  language: boolean;
  deleteChats: boolean;
}

export interface paramters {
  class:string;
  color:string;
  mileage:number;
  accessories:string[]; // checkbox per each accessory
  capacity: number;
  year: string;
  price: number;
  brand: string;
  model: string;
}

@Entity({ schema: 'public', name: 'preferences' })
export class Preferences {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'id_user', type: 'varchar', nullable: false })
  public idUser: string;

  @Column({ name: 'configurations', type: 'jsonb', nullable: false })
  public configurations: configurations;

  @Column({ name: 'parameters', type: 'jsonb', nullable: false })
  public paramters: paramters;

  @OneToOne(() => User, (objUser) => objUser.uuid)
  @JoinColumn({ name: 'id_user', referencedColumnName: 'uuid' })
  public User: User;

  constructor(uuid: string, idUser:string, configuration: configurations, paramters:paramters){
    this.uuid = uuid;
    this.idUser = idUser;
    this.configurations = configuration;
    this.paramters = paramters
  } 
}
