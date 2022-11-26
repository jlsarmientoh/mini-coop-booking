import { BookingDto } from "../dtos/booking.dto";
import { Entity } from "./entity";

export class Booking implements Entity {
    bookingId: string;
    vehicleId: string;
    plate: string;
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
    
    toDTO(): BookingDto {
        return new BookingDto(this.bookingId, this.vehicleId, this.plate, this.date);
    }
}