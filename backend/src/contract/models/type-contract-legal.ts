import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contract } from './contract';

@Entity({ schema: 'public', name: 'type_contract_legal' })
export class TypeContractLegal {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;
  @Column({ name: 'name', type: 'varchar', nullable: false })
  public name: string;

  @OneToMany(
    () => Contract,
    (objContract: Contract) => objContract.idContractTypeLegal,
  )
  public contractsByTypeLegal?: Contract[];

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}
