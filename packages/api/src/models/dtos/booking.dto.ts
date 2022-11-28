import { ApiProperty } from '@nestjs/swagger';
import { DTO } from "./dto";

export class BookingDto implements DTO {
    
    @ApiProperty()
    bookingId: string;

    @ApiProperty()
    vehicleId: string;

    @ApiProperty()
    plate: string;

    @ApiProperty()
    date: string;

    constructor(
        bookingId: string,
        vehicleId: string,
        plate: string,
        date: string) {
            this.bookingId = bookingId;
            this.vehicleId = vehicleId;
            this.plate = plate;
            this.date = date;
        }
}