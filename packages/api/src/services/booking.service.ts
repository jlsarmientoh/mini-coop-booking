import { Inject, Injectable } from "@nestjs/common";
import { BookingDto } from "../models/dtos/booking.dto";
import { Booking } from "../models/entities/booking.entity";
import { MongoRespository } from "../respositorioes/mongo.repository";
import { SQLRepository } from "../respositorioes/sql.respository";

@Injectable()
export class BookingService {

    constructor(
        private readonly mongoRespository: MongoRespository,
        @Inject('SQL')
        private readonly sqlRepository: SQLRepository) {}
    
    async findBookings(limit: number): Promise<BookingDto[]> {
        try {
            return (await this.sqlRepository.findAll(limit))
            .map<BookingDto>((value) => { return value.toDTO()});
        } catch (error) {
            throw new Error(`Reason: ${error.message}`);
        }
    }

    async findBooking(id: string): Promise<BookingDto> {
        try {
            return (await this.sqlRepository.find(id)).toDTO();
        } catch (error) {
            throw new Error(`Reason: ${error.message}`);
        }
    }

    async saveOrUpdateBooking(booking: BookingDto): Promise<void> {
        const entity: Booking = booking.toEntity();
        if(booking.bookingId == null) {
            this.sqlRepository.save(entity);
        } else {
            this.sqlRepository.update(entity);
        }
    }

    async deleteBooking(id: string): Promise<void> {
        this.sqlRepository.delete(id);
    }
}