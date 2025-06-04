import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeContract } from './type-contract';
import { TypeContractLegal } from './type-contract-legal';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceRent } from 'src/services-rent/models/serviceRent';

export interface ContractInfo {}
@Entity({ schema: 'public', name: 'contract' })
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @Column({ name: 'info', type: 'jsonb', nullable: false })
  @ApiProperty({
    name: 'info',
    description: "Contract's information",
    required: true,
    example: {
      title: 'Contract Title',
      description: 'Contract Description',
      version: '1.0',
      effectiveDate: '2023-01-01',
      expirationDate: '2024-01-01',
      content: 'Terms and conditions for use Flex Drive',
      url: 'https://example.com/contract',
    },
  })
  public info: ContractInfo;

  @Column({ name: 'created_at', type: 'date', nullable: false })
  @ApiProperty({
    description: 'Date when the contract was created',
    name: 'createdAt',
    required: true,
    example: '2023-01-01',
  })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  @ApiProperty({
    description: 'Date when the contract was updated',
    name: 'updatedAt',
    required: false,
    example: '2023-12-01',
  })
  public updatedAt: Date;

  @Column({ name: 'status', type: 'bool', nullable: false })
  @ApiProperty({
    description: 'Status of the contract',
    name: 'status',
    required: true,
    example: true,
  })
  public status: boolean;

  @Column({ name: 'id_contract_type', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'idContractType',
    description: "Contract's type (e.g., service, cookies, etc.)",
    required: true,
    example: 'bc8262cd-500f-4df9-a86e-716308db3d77',
  })
  public idContractType: string;

  @Column({ name: 'id_contract_type_legal', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'idContractTypeLegal',
    description: "Contract's legal type (e.g., click-wrap, support, etc.)",
    required: true,
    example: '67e4ac9b-9e59-4549-887a-45d0dcb8c479',
  })
  public idContractTypeLegal: string;

  @Column({ name: 'id_service', type: 'varchar', nullable: true })
  @ApiProperty({
    name: 'idService',
    description: 'Service to which the contract is related',
    required: false,
    example: null,
  })
  public idService: string;

  @Column('text', { name: 'accordants', array: true, nullable: false })
  @ApiProperty({
    description: 'List of users who have accepted the contract',
    name: 'accordants',
    required: true,
    example: ['Flex Drive', 'testing'],
  })
  public accordants: string[];

  @ManyToOne(
    () => TypeContract,
    (objTypeContract: TypeContract) => objTypeContract.contractsByType,
    {
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'id_contract_type', referencedColumnName: 'uuid' }])
  public typeContractByContract?: TypeContract;

  @ManyToOne(
    () => TypeContractLegal,
    (objTypeContractLegal: TypeContractLegal) =>
      objTypeContractLegal.contractsByTypeLegal,
    {
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn([
    { name: 'id_contract_type_legal', referencedColumnName: 'uuid' },
  ])
  public typeContractLegalByContract?: TypeContract;

  @OneToOne(() => ServiceRent, (objRent: ServiceRent) => objRent.uuid)
  @JoinColumn({ name: 'id_service', referencedColumnName: 'uuid' })
  public ServiceRent: ServiceRent;
}
