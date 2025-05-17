import { User } from 'src/user/models/user';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeNotification } from './type-notification';

@Entity({ schema: 'public', name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  public description: string;

  @Column({ name: 'created_at', type: 'date', nullable: false })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: false })
  public updatedAt: Date;

  @Column({ name: 'send_date', type: 'date', nullable: false })
  public sendDate: Date;

  @Column({ name: 'seen_date', type: 'date', nullable: false })
  public seenDate: Date;

  @Column({ name: 'status', type: 'bool', nullable: false })
  public status: boolean;

  @Column({ name: 'id_type_notification', type: 'varchar', nullable: false })
  public idTypeNotification: string;

  @Column({ name: 'id_user', type: 'varchar', nullable: false })
  public idUser: string;

  @ManyToOne(() => User, (objUser: User) => objUser.userNotifications, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'uuid' }])
  public notificationUser?: User;

  @ManyToOne(
    () => TypeNotification,
    (objTypeNotification: TypeNotification) =>
      objTypeNotification.notificationByType,
    {
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'id_type_notification', referencedColumnName: 'uuid' }])
  public typeNotificationByNotification?: User;

  constructor(
    description: string,
    createdAt: Date,
    updatedAt: Date,
    sendDate: Date,
    seenDate: Date,
    status: boolean,
    idTypeNotification: string,
    idUser: string,
  ) {
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.sendDate = sendDate;
    this.seenDate = seenDate;
    this.status = status;
    this.idTypeNotification = idTypeNotification;
    this.idUser = idUser;
  }
}
