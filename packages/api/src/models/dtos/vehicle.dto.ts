import { IEntity } from "../entities/entity";
import { Vehicle } from "../entities/vehicle.entity";
import { DTO } from "./dto";

export class VehicleDto implements DTO {
    id: string;

    plate: string;

    brand:string;

    constructor(id: string,
        plate: string,
        brand: string) {
            this.id = id;
            this.plate = plate;
            this.brand = brand;
        }

    toEntity(): Vehicle {
        return new Vehicle(this.id, this.plate, this.brand);
    }
}