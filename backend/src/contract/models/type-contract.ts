import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contract } from "./contract";

@Entity({schema: 'public', name: 'type_contract'})
export class TypeContract {
    @PrimaryGeneratedColumn('uuid')
    public uuid: string;
    @Column({name: 'name', type: 'varchar', nullable: false})
    public name: string;

    @OneToMany(
        () => Contract,
        (objContract: Contract) => objContract.idContractType,
      )
      public contractsByType?: Contract[];

    constructor(uuid: string, name: string) {
        this.uuid = uuid;
        this.name = name;
    }   
}
