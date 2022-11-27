import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleDto } from '../dtos/vehicle.dto';
import { IEntity } from './entity';

@Entity()
export class Vehicle implements IEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 8})
    plate: string;

    @Column({length: 20})
    brand: string;

    constructor(id: string, 
        plate: string, 
        brand: string) {
        this.id = id;
        this.plate = plate;
        this.brand = brand;
    }
    toDTO(): VehicleDto {
        return new VehicleDto(this.id, this.plate, this.brand);
    }
}