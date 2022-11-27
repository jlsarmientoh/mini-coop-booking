import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "../entities/vehicle.entity";
import { DTO } from "./dto";

export class CreateVehicleDto implements DTO {
    
    @ApiProperty()
    plate: string;

    @ApiProperty()
    brand: string;

    toEntity(): Vehicle {
        return new Vehicle(null, this.plate, this.brand);
    }
}
