import { DataSource } from 'typeorm';
import { Booking } from '../models/entities/booking.entity';
import { Vehicle } from '../models/entities/vehicle.entity';

export const repositroyProviders = [
    {
        provide: 'VEHICLE_REPOSITORY',
        useFactory: (datasource: DataSource) => datasource.getRepository<Vehicle>(Vehicle),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'BOOKING_REPOSITORY',
        useFactory: (datasource: DataSource) => datasource.getRepository<Booking>(Booking),
        inject: ['DATA_SOURCE'],
    },
];