import { IEntity } from "../entities/entity";
import { Vehicle } from "../entities/vehicle.entity";
import { DTO } from "./dto";

export class CreateVehicleDto implements DTO {
    
    plate: string;

    brand: string;

    toEntity(): Vehicle {
        return new Vehicle(null, this.plate, this.brand);
    }
}
