import { Vehicle } from "./vehicle";

export class Price {
    public uuid?: string;
    public price: number;
    public startDate: Date;
    public endDate: Date;
    public idVehicle: string;
    public vehicle?: Vehicle;
    constructor(
        price: number,
        startDate: Date,
        endDate: Date,
        idVehicle: string,
        uuid?: string
    ) {
        this.uuid = uuid;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.idVehicle = idVehicle;
    }
}
