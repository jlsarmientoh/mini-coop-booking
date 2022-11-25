export class BookingDto {
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
}