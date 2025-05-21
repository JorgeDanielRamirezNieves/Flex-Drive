import { Vehicle } from "./vehicle";

export class TecnicalDetails {
    public idDetails: string;
    public idVehicle: string;
    public serviceType: 'private' | 'public';
    public brand: string;
    public model: string;
    public year: string;
    public cylinderCapacity: string;
    public fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'biofuel';
    public weight: string;
    public loadCapacity: string; 
    public noChassis: string;
    public vehicle?: Vehicle;
    constructor(
        idDetails: string,
        idVehicle: string,
        serviceType: 'private' | 'public',
        brand: string,
        model: string,
        year: string,
        cylinderCapacity: string,
        fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'biofuel',
        weight: string,
        loadCapacity: string,
        noChassis: string,
    ) {
        this.idDetails = idDetails;
        this.idVehicle = idVehicle;
        this.serviceType = serviceType;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.cylinderCapacity = cylinderCapacity;
        this.fuelType = fuelType;
        this.weight = weight;
        this.loadCapacity = loadCapacity;
        this.noChassis = noChassis;
    }
}
