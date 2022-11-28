import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from 'typeorm';
import { BookingDto } from "../dtos/booking.dto";
import { IEntity } from "./entity";
import { Vehicle } from './vehicle.entity';

@Entity()
export class Booking implements IEntity {

    @PrimaryGeneratedColumn("uuid")
    bookingId: string;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings)
    vehicle: Vehicle;

    @Column({length: 20})
    plate: string;

    @Column({length: 20})
    date: string;
    
    toDTO(): BookingDto {
        return new BookingDto(this.bookingId, this.vehicle.id, this.plate, this.date);
    }
}