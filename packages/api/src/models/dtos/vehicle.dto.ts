import { ApiProperty } from "@nestjs/swagger";
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
}