import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from './notification';

@Entity({ schema: 'public', name: 'type_notification' })
export class TypeNotification {

  @PrimaryGeneratedColumn('uuid')
  public uuid: string;
  
  @Column({ name: 'name', type: 'varchar', length: 50, unique: true })
  public name: string;

  @OneToMany(
    () => Notification,
    (objNotification: Notification) => objNotification.idTypeNotification,
  )
  public notificationByType?: Notification[];

  constructor(name: string) {
    this.name = name;
  }
}
