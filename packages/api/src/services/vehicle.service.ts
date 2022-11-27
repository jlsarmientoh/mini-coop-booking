import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vehicle } from '../models/entities/vehicle.entity';

@Injectable()
export class VehicleService {
    constructor(
        @Inject('BOOKING_REPOSITORY') 
        private readonly repository: Repository<Vehicle>
    ) {}

    async findAll(): Promise<Vehicle[]> {
        return this.repository.find();
    }
}