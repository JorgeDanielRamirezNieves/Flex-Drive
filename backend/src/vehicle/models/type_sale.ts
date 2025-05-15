import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle";

@Entity({ schema: 'public', name: 'type_sale' })
export class TypeSale {
    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
    public name: string;

    @OneToMany(() => Vehicle, (objVehicle: Vehicle) => objVehicle.idTypeSale)
      public vehiclesTypeSale?: Vehicle[]; 

    constructor(name: string) {
        this.name = name;
    }
}
