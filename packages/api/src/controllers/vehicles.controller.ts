import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateVehicleDto } from '../models/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../models/dtos/update-vehicle.dto';
import { VehicleDto } from '../models/dtos/vehicle.dto';
import { VehicleService } from '../services/vehicle.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<VehicleDto> {
    return await this.vehicleService.create(createVehicleDto);
  }

  @Get()
  async findAll(): Promise<VehicleDto[]> {
    return await this.vehicleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VehicleDto> {
    return await this.vehicleService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto): Promise<VehicleDto> {
    return await this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<VehicleDto> {
    return await this.vehicleService.remove(id);
  }
}
