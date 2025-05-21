import { Vehicle } from "./vehicle";

export class TypeSale {
    public uuid: string;
    public name: string;
    public vehiclesTypeSale?: Vehicle[];
    constructor(uuid:string, name: string) {
        this.uuid = uuid;
        this.name = name;
    }
}
