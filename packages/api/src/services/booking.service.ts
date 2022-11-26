import { Injectable } from "@nestjs/common";
import { BookingDto } from "src/models/dtos/booking.dto";
import { MongoRespository } from "../respositorioes/mongo.repository";
import { SQLRepository } from "../respositorioes/sql.respository";

@Injectable()
export class BookingService {

    constructor(
        private readonly mongoRespository: MongoRespository,
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
        const entity = booking.toEntity()
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