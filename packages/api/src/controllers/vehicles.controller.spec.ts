import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehicleService } from '../services/vehicle.service';
import { DatabaseModule } from '../database.module';
import { VehicleDto } from '../models/dtos/vehicle.dto';
import { CreateVehicleDto } from '../models/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../models/dtos/update-vehicle.dto';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [VehiclesController],
      providers: [VehicleService],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    service = module.get<VehicleService>(VehicleService);
  });

  describe('Vehicle Controllwe - CRUD', () => {
    it('should return Vehicle list', async () => {
      const expected: VehicleDto[] = [
        new VehicleDto("1", "ABC123", "KIA"),
        new VehicleDto("2", "ABC456", "FERRARI"),
        new VehicleDto("2", "ABC789", "TESLA")
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => expected);

      const actual = await controller.findAll();

      expect(actual).toBe(expected);
    });

    it('should return Vehicle details', async () => {
      const expected: VehicleDto = new VehicleDto("1", "ABC123", "KIA");
      jest.spyOn(service, 'findOne').mockImplementation(async () => expected);

      const actual = await controller.findOne("1");

      expect(actual).toBe(expected);
    });

    it('should create a new Vehicle', async () => {
      const expected: VehicleDto = new VehicleDto("1", "ABC123", "KIA");
      const newVehicle = new CreateVehicleDto();
      newVehicle.brand = "KIA";
      newVehicle.plate = "ABC123";

      jest.spyOn(service, 'create').mockImplementation(async () => expected);

      expect( await controller.create(newVehicle)).toBe(expected);
    });

    it('should modify a Vehicle', async () => {
      const expected: VehicleDto = new VehicleDto("1", "ABC123", "KIA");
      const vehicleToUpdate = new UpdateVehicleDto();
      vehicleToUpdate.brand = "KIA";
      vehicleToUpdate.plate = "ABC123";

      jest.spyOn(service, 'update').mockImplementation(async () => expected);

      expect( await controller.update("1", vehicleToUpdate)).toBe(expected);
    });
  });
});
