import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import { VehicleService } from '../services/vehicle.service';

describe('VehiclesService', () => {
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [VehicleService],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
