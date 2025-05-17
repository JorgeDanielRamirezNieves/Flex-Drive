import { User } from 'src/user/models/user';
import { Vehicle } from 'src/vehicle/models/vehicle';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'public', name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'send_date', type: 'date', nullable: false })
  public sendDate: Date;

  @Column({ name: 'answer_date', type: 'date', nullable: false })
  public answerDate: Date;

  @Column({ name: 'delivery_date', type: 'date', nullable: false })
  public deliveryDate: Date;

  @Column({ name: 'return_date', type: 'date', nullable: false })
  public returnDate: Date;

  @Column({ name: 'description', type: 'text', nullable: false })
  public description: string;

  @Column({ name: 'id_client', type: 'varchar', nullable: false })
  public idClient: string;

  @Column({ name: 'id_vehicle', type: 'varchar', nullable: false })
  public idVehicle: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['approved', 'negotiating', 'rejected'],
    nullable: false,
  })
  public status: 'approved' | 'negotiating' | 'rejected';

  @ManyToOne(() => User, (objUser: User) => objUser.userRequests, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_client', referencedColumnName: 'uuid' }])
  public requestUser?: User;
  
  @ManyToOne(() => Vehicle, (objVehicle: Vehicle) => objVehicle.requestVehicle, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_vehicle', referencedColumnName: 'uuid' }])
  public requestvehicle?: User;


}
