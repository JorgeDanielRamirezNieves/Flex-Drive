import { Request } from 'src/requests/models/request';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message';

@Entity({ schema: 'public', name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'created_at', type: 'date', nullable: false })
  public createdAt: Date;

  @Column({ name: 'id_request', type: 'varchar', nullable: false })
  public idrequest: string;

  @Column({ name: 'status', type: 'bool', nullable: false })
  public status: boolean;

  @OneToOne(() => Request, (objRequest) => objRequest.uuid)
  @JoinColumn({ name: 'id_request', referencedColumnName: 'uuid' })
  public request: Request;

  @OneToMany(() => Message, (objMessege: Message) => objMessege.idChat)
  public chatMessage?: Message[];

  constructor(
    uuid: string,
    createdAt: Date,
    idrequest: string,
    status: boolean,
  ) {
    this.uuid = uuid;
    this.createdAt = createdAt;
    this.idrequest = idrequest;
    this.status = status;
  }
}
