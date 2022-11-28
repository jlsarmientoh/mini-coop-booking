import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import { VehicleService } from '../services/vehicle.service';
import { Repository } from 'typeorm';
import { Vehicle } from '../models/entities/vehicle.entity';
import { VehicleDto } from '../models/dtos/vehicle.dto';

function createMockVehicle(id: string, plate: string, brand: string) {
  const entity = new Vehicle();
  entity.id = id;
  entity.plate = plate;
  entity.brand = brand;
  return entity;
}

describe('VehiclesService', () => {
  let service: VehicleService;
  let repository: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [VehicleService],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    repository = module.get<Repository<Vehicle>>('VEHICLE_REPOSITORY');
  });

  describe('findAll', () => {
    it('Should return vehicles list', async () => {
      const mockResponse: Vehicle[] = [
        createMockVehicle("1", "ABC123", "KIA"),
        createMockVehicle("1", "DEF456", "GM"),
        createMockVehicle("1", "GHI789", "TESLA"),
      ];
      const expected: VehicleDto[] = [];

      mockResponse.forEach((item) => {
        expected.push(item.toDTO());
      });

      jest.spyOn(repository, 'find').mockImplementation(async () => mockResponse);

      const actual = await service.findAll();

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('findOne', () => {
    it('Should return vehicle details', async () => {
      const mockResponse: Vehicle = createMockVehicle("1", "ABC123", "KIA");
      const expected: VehicleDto = mockResponse.toDTO();

      jest.spyOn(repository, 'findOneBy').mockImplementation(async () => mockResponse);

      const actual = await service.findOne("1");

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('saveOrUpdateBooking', () => {
    it('should save new Booking', async () => {
      const mockResponse: Vehicle = createMockVehicle("1", "ABC123", "KIA");
      const expected: VehicleDto = mockResponse.toDTO();

      jest.spyOn(repository, 'save').mockImplementation(async () => mockResponse);
      jest.spyOn(repository, 'findOneBy').mockImplementation(async () => mockResponse);

      await service.create(new VehicleDto(null, "1", "ABC123"));
      const actual = await service.findOne("1");

      expect(actual).toStrictEqual(expected);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should update existing Booking', async () => {
      const mockResponse: Vehicle = createMockVehicle("1", "ABC123", "KIA");
      const expected: VehicleDto = mockResponse.toDTO();

      jest.spyOn(repository, 'save').mockImplementation(async () => mockResponse);
      jest.spyOn(repository, 'findOneBy').mockImplementation(async () => mockResponse);

      await service.update(expected.id, expected);
      const actual = await service.findOne("1");

      expect(actual).toStrictEqual(expected);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Should delete Vehicle', async () => {
      const mockResponse: Vehicle = createMockVehicle("1", "ABC123", "KIA");

      jest.spyOn(repository, 'remove').mockImplementation(async () => mockResponse);
      jest.spyOn(repository, 'findOneBy').mockImplementation(async () => mockResponse);

      await service.remove("1");
      
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
