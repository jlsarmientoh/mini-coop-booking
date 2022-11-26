import { Test, TestingModule } from '@nestjs/testing';
import { BookingDto } from '../models/dtos/booking.dto';
import { BookingService } from '../services/booking.service';
import { SQLRepository } from '../respositorioes/sql.respository';
import { MongoRespository } from '../respositorioes/mongo.repository';
import { Booking } from '../models/entities/booking.entity';

describe('BookingService', () => {
  let service: BookingService;
  let sqlRepository: SQLRepository;
  let mongoRespository: MongoRespository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [BookingService, SQLRepository, MongoRespository],
    }).compile();

    service = app.get<BookingService>(BookingService);
    sqlRepository = app.get<SQLRepository>(SQLRepository);
    mongoRespository = app.get<MongoRespository>(MongoRespository);
  });

  describe('findAll', () => {
    it('should return Booking list', async () => {
      const limit = 3;
      const mockResponse: Booking[] = [
        new Booking("1", "1", "ABC123", "01/12/2022"),
        new Booking("2", "2", "ABC456", "01/12/2022"),
        new Booking("2", "2", "ABC789", "01/12/2022")
      ];
      const expected: BookingDto[] = [];
      
      mockResponse.forEach((item) => {
        expected.push(item.toDTO());
      });

      jest.spyOn(sqlRepository, 'findAll').mockImplementation(async () => mockResponse);

      const actual = await service.findBookings(limit);

      expect(actual).toHaveLength(limit);
      expect(actual).toStrictEqual(expected);
    });

    it('should return Booking details', async () => {
      const mockResponse: Booking = new Booking("1", "1", "ABC123", "01/12/2022");
      const expected: BookingDto = mockResponse.toDTO();

      jest.spyOn(sqlRepository, 'find').mockImplementation(async () => mockResponse);

      const actual = await service.findBooking("1");

      expect(actual).toStrictEqual(expected);
    });
  });
});
