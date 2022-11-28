import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { BookingDto } from "../models/dtos/booking.dto";
import { Booking } from "../models/entities/booking.entity";
import { Vehicle } from "../models/entities/vehicle.entity";

@Injectable()
export class BookingService {

    constructor(
        @Inject('BOOKING_REPOSITORY')
        private readonly repository: Repository<Booking>) {}
    
    async findBookings(limit: number): Promise<BookingDto[]> {
        try {
            return (await this.repository.find())
            .map<BookingDto>((value) => { return value.toDTO()});
        } catch (error) {
            throw new Error(`Reason: ${error.message}`);
        }
    }

    async findBooking(id: string): Promise<BookingDto> {
        try {
            return (await this.repository.findOneBy({
                bookingId: id
            })).toDTO();
        } catch (error) {
            throw new Error(`Reason: ${error.message}`);
        }
    }

    async saveOrUpdateBooking(booking: BookingDto): Promise<BookingDto> {
        const entity: Booking = new Booking();
        const vehicle: Vehicle = new Vehicle();
        entity.bookingId = booking.bookingId;
        entity.plate = booking.plate;
        entity.date = booking.date;
        vehicle.id = booking.vehicleId;
        entity.vehicle = vehicle;
        return (await this.repository.save(entity)).toDTO();
    }

    async deleteBooking(id: string): Promise<BookingDto> {
        const bookingToDelete: Booking = await this.repository.findOneBy({bookingId: id});
        return (await this.repository.remove(bookingToDelete)).toDTO();
    }
}