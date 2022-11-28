import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from '../models/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../models/dtos/update-vehicle.dto';
import { VehicleDto } from '../models/dtos/vehicle.dto';
import { Vehicle } from '../models/entities/vehicle.entity';

@Injectable()
export class VehicleService {
    constructor(
        @Inject('VEHICLE_REPOSITORY') 
        private readonly repository: Repository<Vehicle>
    ) {}

    async create(createVehicleDto: CreateVehicleDto): Promise<VehicleDto> {
        const newVehicle: Vehicle = new Vehicle();
        newVehicle.brand = createVehicleDto.brand;
        newVehicle.plate = createVehicleDto.plate
        return (await this.repository.save(newVehicle)).toDTO();
    }

    async findAll(): Promise<VehicleDto[]> {
        return (await this.repository.find())
        .map<VehicleDto>((value) => { return value.toDTO() });
       
    }

    async findOne(id: string): Promise<VehicleDto> {
        return (await this.repository.findOneBy({id: id})).toDTO();
    }
    
    async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<VehicleDto> {
        const vehicleToUpdate = await this.repository.findOneBy({id: id});
        vehicleToUpdate.plate = updateVehicleDto.plate;
        vehicleToUpdate.brand = updateVehicleDto.brand;
        return (await this.repository.save(vehicleToUpdate)).toDTO();
    }
    
    async remove(id: string): Promise<VehicleDto> {
        const vehicleToDelete =  await this.repository.findOneBy({id: id});
        return (await this.repository.remove(vehicleToDelete)).toDTO();
    }
}