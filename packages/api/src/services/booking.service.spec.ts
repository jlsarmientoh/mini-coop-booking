import { Test, TestingModule } from '@nestjs/testing';
import { BookingDto } from '../models/dtos/booking.dto';
import { BookingService } from '../services/booking.service';
import { SQLRepository } from '../respositorioes/sql.respository';
import { MongoRespository } from '../respositorioes/mongo.repository';
import { Booking } from '../models/entities/booking.entity';
import { DatabaseModule } from '../database.module';

describe('BookingService', () => {
  let service: BookingService;
  let sqlRepository: SQLRepository;
  let mongoRespository: MongoRespository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [BookingService, MongoRespository],
    }).compile();

    service = app.get<BookingService>(BookingService);
    sqlRepository = app.get<SQLRepository>('SQL');
    mongoRespository = app.get<MongoRespository>(MongoRespository);
  });

  describe('findBookings', () => {
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
  });

  describe('findBooking', () => {
    it('should return Booking details', async () => {
      const mockResponse: Booking = new Booking("1", "1", "ABC123", "01/12/2022");
      const expected: BookingDto = mockResponse.toDTO();

      jest.spyOn(sqlRepository, 'find').mockImplementation(async () => mockResponse);

      const actual = await service.findBooking("1");

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('saveOrUpdateBooking', () => {
    it('should save new Booking', async () => {
      const mockResponse: Booking = new Booking("1", "1", "ABC123", "01/12/2022");
      const expected: BookingDto = mockResponse.toDTO();

      jest.spyOn(sqlRepository, 'save').mockImplementation(async () => {});
      jest.spyOn(sqlRepository, 'update').mockImplementation(async () => {});
      jest.spyOn(sqlRepository, 'find').mockImplementation(async () => mockResponse);

      await service.saveOrUpdateBooking(new BookingDto(null, "1", "ABC123", "01/12/2022"));
      const actual = await service.findBooking("1");

      expect(actual).toStrictEqual(expected);
      expect(sqlRepository.save).toHaveBeenCalledTimes(1);
      expect(sqlRepository.update).toHaveBeenCalledTimes(0);
    });

    it('should update existing Booking', async () => {
      const mockResponse: Booking = new Booking("1", "1", "ABC123", "01/12/2022");
      const expected: BookingDto = mockResponse.toDTO();

      jest.spyOn(sqlRepository, 'save').mockImplementation(async () => {});
      jest.spyOn(sqlRepository, 'update').mockImplementation(async () => {});
      jest.spyOn(sqlRepository, 'find').mockImplementation(async () => mockResponse);

      await service.saveOrUpdateBooking(expected);
      const actual = await service.findBooking("1");

      expect(actual).toStrictEqual(expected);
      expect(sqlRepository.update).toHaveBeenCalledTimes(1);
      expect(sqlRepository.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleteBooking', () => {
    it('should delete Booking', async () => {
      jest.spyOn(sqlRepository, 'delete').mockImplementation(async () => {});

      await service.deleteBooking("1");
      
      expect(sqlRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
