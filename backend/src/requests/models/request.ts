import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    name: 'sendDate',
    description: 'Date when the request was sent',
    required: true,
    example: '2023-01-01',
  })
  public sendDate: Date;

  @Column({ name: 'answer_date', type: 'date', nullable: false })
  @ApiProperty({
    name: 'answerDate',
    description: 'Date when the request was answered',
    required: true,
    example: '2023-01-01',
  })
  public answerDate: Date;

  @Column({ name: 'delivery_date', type: 'date', nullable: false })
  @ApiProperty({
    name: 'deliveryDate',
    description: 'Date when the vehicle was delivered',
    required: true,
    example: '2023-12-01',
  })
  public deliveryDate: Date;

  @Column({ name: 'return_date', type: 'date', nullable: false })
  @ApiProperty({
    name: 'returnDate',
    description: 'Date when the vehicle was returned',
    required: true,
    example: '2023-12-24',
  })
  public returnDate: Date;

  @Column({ name: 'description', type: 'text', nullable: false })
  @ApiProperty({
    name: 'description',
    description: 'Description of the request',
    required: true,
    example: 'This is a great vehicle. I want to rent it!.',
  })
  public description: string;

  @Column({ name: 'id_client', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'idClient',
    description: "User's ID",
    required: true,
    example: '4696998d-570e-48b4-8aeb-e709ebf84beb',
  })
  public idClient: string;

  @Column({ name: 'id_vehicle', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'idVehicle',
    description: "Vehicle's ID",
    required: true,
    example: 'f9fe51ae-c0c1-4dd0-b14f-233fd3c30387',
  })
  public idVehicle: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['pending', 'approved', 'negotiating', 'rejected'],
    nullable: false,
  })
  @ApiProperty({
    name: 'status',
    description: 'Status of the request',
    required: true,
    enum: ['pending', 'approved', 'negotiating', 'rejected'],
    example: 'negotiating',
  })
  public status: 'pending' | 'approved' | 'negotiating' | 'rejected';

  @ManyToOne(() => User, (objUser: User) => objUser.userRequests, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_client', referencedColumnName: 'uuid' }])
  public requestUser?: User;

  @ManyToOne(
    () => Vehicle,
    (objVehicle: Vehicle) => objVehicle.requestVehicle,
    {
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'id_vehicle', referencedColumnName: 'uuid' }])
  public requestVehicle?: Vehicle;
}
