import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { VehicleDto } from '../dtos/vehicle.dto';
import { Booking } from './booking.entity';
import { IEntity } from './entity';

@Entity()
export class Vehicle implements IEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 8})
    plate: string;

    @Column({length: 20})
    brand: string;

    @OneToMany(() => Booking, (booking) => booking.vehicle)
    bookings: Booking[];

    toDTO(): VehicleDto {
        return new VehicleDto(this.id, this.plate, this.brand);
    }
}