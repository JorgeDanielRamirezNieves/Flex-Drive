import { Vehicle } from "./vehicle";

export class Tecnomecanic {
    public noCertificate: string;
    public status: boolean;
    public expeditionDate: Date;
    public expirationDate: Date;
    public entitie: string;
    public idVehicle: string;
    public vehicleTecnomecnic?: Vehicle;
    constructor(
        noCertificate: string,
        status: boolean,
        expeditionDate: Date,
        expirationDate: Date,
        entitie: string,
        idVehicle: string,
    ) {
        this.noCertificate = noCertificate;
        this.status = status;
        this.expeditionDate = expeditionDate;
        this.expirationDate = expirationDate;
        this.entitie = entitie;
        this.idVehicle = idVehicle;
    }
}
