import { Request } from 'src/requests/models/request';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ schema: 'public', name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['for_take', 'on_travel', 'reported', 'for_recive', 'finished'],
    nullable: false,
  })
  public status:
    | 'for_take'
    | 'on_travel'
    | 'reported'
    | 'for_recive'
    | 'finished';

  @Column({ name: 'created_at', type: 'date', nullable: false })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  public updatedAt: Date;

  @Column({ name: 'id_request', type: 'date', nullable: false })
  public idRequest: string;

  @OneToOne(() => Request, (objRequests) => objRequests.uuid)
  @JoinColumn({ name: 'id_request', referencedColumnName: 'uuid' })
  public request: Request;

  constructor(
    uuid: string,
    status: 'for_take' | 'on_travel' | 'reported' | 'for_recive' | 'finished',
    createdAt: Date,
    updatedAt: Date,
    idRequest: string,
  ) {
    this.uuid = uuid;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.idRequest = idRequest;
  }
}
