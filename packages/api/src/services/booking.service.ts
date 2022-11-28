import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { BookingDto } from "../models/dtos/booking.dto";
import { Booking } from "../models/entities/booking.entity";
import { Vehicle } from "../models/entities/vehicle.entity";

@Injectable()
export class BookingService {

    constructor(
        @Inject('BOOKING_REPOSITORY')
        private readonly booKingRepository: Repository<Booking>,
        @Inject('VEHICLE_REPOSITORY') 
        private readonly vehicleRepository: Repository<Vehicle>) {}
    
    async findBookings(limit: number): Promise<BookingDto[]> {
        try {
            return (await this.booKingRepository.find())
            .map<BookingDto>((value) => { return value.toDTO()});
        } catch (error) {
            throw new Error(`Reason: ${error.message}`);
        }
    }

    async findBooking(id: string): Promise<BookingDto> {
        try {
            return (await this.booKingRepository.findOne({
                where: { bookingId: id },
                relations: {
                    vehicle: true,
                }
            })).toDTO();
        } catch (error) {
            throw new Error(`Reason: ${error.message}`);
        }
    }

    async saveOrUpdateBooking(booking: BookingDto): Promise<BookingDto> {
        const entity: Booking = new Booking();
        const vehicle = this.vehicleRepository.findOneBy({id: booking.vehicleId});
        entity.bookingId = booking.bookingId;
        entity.plate = booking.plate;
        entity.date = booking.date;
        entity.vehicle = await vehicle;
        return (await this.booKingRepository.save(entity)).toDTO();
    }

    async deleteBooking(id: string): Promise<BookingDto> {
        const bookingToDelete: Booking = await this.booKingRepository.findOneBy({bookingId: id});
        return (await this.booKingRepository.remove(bookingToDelete)).toDTO();
    }
}