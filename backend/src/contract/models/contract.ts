import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeContract } from './type-contract';
import { TypeContractLegal } from './type-contract-legal';

export interface ContractInfo {}
@Entity({ schema: 'public', name: 'contract' })
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;
  @Column({ name: 'info', type: 'jsonb', nullable: false })
  public info: ContractInfo;

  @Column({ name: 'created_at', type: 'date', nullable: false })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  public updatedAt: Date;

  @Column({ name: 'status', type: 'bool', nullable: false })
  public status: boolean;

  @Column({ name: 'id_contract_type', type: 'varchar', nullable: false })
  public idContractType: string;

  @Column({ name: 'id_contract_type_legal', type: 'varchar', nullable: false })
  public idContractTypeLegal: string;

  @Column({ name: 'id_service', type: 'varchar', nullable: true })
  public idService: string;

  @Column('text', { name: 'accordants', array: true, nullable: false })
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
      (objTypeContractLegal: TypeContractLegal) => objTypeContractLegal.contractsByTypeLegal,
      {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
    )
    @JoinColumn([{ name: 'id_contract_type_legal', referencedColumnName: 'uuid' }])
    public typeContractLegalByContract?: TypeContract;
}
