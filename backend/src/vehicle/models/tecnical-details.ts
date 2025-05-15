import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle";

@Entity({schema: "public", name: "tecnical_details"})
export class TecnicalDetails {

    @PrimaryGeneratedColumn("uuid")
    public idDetails: string;

    @Column({name: "id_vehicle", type: "varchar", unique: true, nullable: false})
    public idVehicle: string;

    @Column({name: "service_type", type: "enum", enum: ["private", "public"], nullable: false})
    public serviceType: "private" | "public";

    @Column({name: 'brand', type: "varchar", length: 50, nullable: false})
    public brand: string;

    @Column({name: 'model', type: "varchar", length: 50, nullable: false})
    public model: string;

    @Column({name: 'year', type: "varchar", length: 4, nullable: false})
    public year: string;

    @Column({name: 'cylinder_capacity', type: "varchar", length: 50, nullable: false})
    public cylinderCapacity: string;

    @Column({name: 'fuel_type', type: "enum", enum: ["gasoline", "diesel", "electric", "hybrid", "biofuel"], nullable: false})
    public fuelType: 'gasoline'| 'diesel'| 'electric'| 'hybrid'| 'biofuel';

    @Column({name: 'weight', type: "varchar", length: 50, nullable: false})
    public weight: string;

    @Column({name: 'load_capacity', type: "varchar", length: 50, nullable: false})
    public loadCapacity: string

    @Column({name: 'chassis_number', type: "varchar", length: 50, nullable: false})
    public noChassis:string

    @OneToOne(() => Vehicle, (vehicle) => vehicle.uuid)
    @JoinColumn({name: "id_vehicle", referencedColumnName: "uuid"})
    public vehicle: Vehicle;

    constructor(
        idDetails: string,
        idVehicle: string,
        serviceType: "private" | "public",
        brand: string,
        model: string,
        year: string,
        cylinderCapacity: string,
        fuelType: 'gasoline'| 'diesel'| 'electric'| 'hybrid'| 'biofuel',
        weight: string,
        loadCapacity: string,
        noChassis:string
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
        this.noChassis = noChassis
    }
}
