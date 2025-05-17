import { User } from './../../user/models/user';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat';

@Entity({ schema: 'public', name: 'message' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'send_date', type: 'date', nullable: false })
  public sendDate: Date;

  @Column({ name: 'status', type: 'bool', nullable: false })
  public status: boolean;

  @Column({ name: 'id_chat', type: 'varchar', nullable: false })
  public idChat: string;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  public image: string;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  public description: string;

  @Column({ name: 'id_sender', type: 'varchar', nullable: false })
  public idSender: string;

  @Column({ name: 'id_receiver', type: 'varchar', nullable: false })
  public idReceiver: string;

  @ManyToOne(() => User, (objUser: User) => objUser.userMessageSender, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_sender', referencedColumnName: 'uuid' }])
  public senderUser?: User;

  @ManyToOne(() => User, (objUser: User) => objUser.userMessageReceiver, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_receiver', referencedColumnName: 'uuid' }])
  public receiverUser?: User;
  
  @ManyToOne(() => Chat, (objChat: Chat) => objChat.chatMessage, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_chat', referencedColumnName: 'uuid' }])
  public messageChat?: Chat;
 
  constructor(
    uuid: string,
    sendDate: Date,
    status: boolean,
    idChat: string,
    image: string,
    description: string,
    idSender: string,
    idReceiver: string,
  ) {
    this.uuid = uuid;
    this.sendDate = sendDate;
    this.status = status;
    this.idChat = idChat;
    this.image = image;
    this.description = description;
    this.idSender = idSender;
    this.idReceiver = idReceiver;
  }
}
