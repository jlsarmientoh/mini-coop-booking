import { ApiProperty } from '@nestjs/swagger';
import { Booking } from "../entities/booking.entity";
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
    
    toEntity(): Booking {
        return new Booking(this.bookingId, this.vehicleId, this.plate, this.date);
    }
}