import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "../entities/vehicle.entity";
import { DTO } from "./dto";

export class VehicleDto implements DTO {
    
    @ApiProperty()
    id: string;

    @ApiProperty()
    plate: string;

    @ApiProperty()
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