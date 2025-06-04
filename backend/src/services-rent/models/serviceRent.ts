import { ApiProperty } from '@nestjs/swagger';
import { Contract } from 'src/contract/models/contract';
import { Request } from 'src/requests/models/request';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ schema: 'public', name: 'services' })
export class ServiceRent {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['for_take', 'on_travel', 'reported', 'for_recive', 'finished'],
    nullable: false,
  })
  @ApiProperty({
    description: 'Status of the service',
    example: 'for_take',
    type: String,
    enum: ['for_take', 'on_travel', 'reported', 'for_recive', 'finished'],
  })
  public status:
    | 'for_take'
    | 'on_travel'
    | 'reported'
    | 'for_recive'
    | 'finished';

  @Column({ name: 'created_at', type: 'date', nullable: false })
  @ApiProperty({
    description: 'Date of creation of the service',
    example: '2023-10-01',
    type: Date,
  })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  @ApiProperty({
    description: 'Date of update of the service',
    example: '2023-10-01',
    type: Date,
  })
  public updatedAt: Date;

  @Column({ name: 'id_request', type: 'date', nullable: false })
  @ApiProperty({
    description: 'UUID of the request',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  public idRequest: string;

  @OneToOne(() => Request, (objRequests) => objRequests.uuid)
  @JoinColumn({ name: 'id_request', referencedColumnName: 'uuid' })
  public request?: Request;

  @OneToOne(() => Contract, (objContract: Contract) => objContract.ServiceRent)
  public ContractService: Contract;

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
