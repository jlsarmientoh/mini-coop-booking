import { ApiProperty } from "@nestjs/swagger";
import { DTO } from "./dto";

export class CreateVehicleDto implements DTO {
    
    @ApiProperty()
    plate: string;

    @ApiProperty()
    brand: string;
}
