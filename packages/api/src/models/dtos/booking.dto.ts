import { Booking } from "../entities/booking.entity";
import { DTO } from "./dto";

export class BookingDto implements DTO {
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
    
    toEntity(): Booking {
        return new Booking(this.bookingId, this.vehicleId, this.plate, this.date);
    }
}