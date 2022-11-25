export class BookingDto {
    bookinId: string;
    vehicleId: string;
    plate: string;
    date: string;

    constructor(
        bookinId: string,
        vehicleId: string,
        plate: string,
        date: string) {
            this.bookinId = bookinId;
            this.vehicleId = vehicleId;
            this.plate = plate;
            this.date = date;
        }
}