import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { BookingDto } from '../models/dtos/booking.dto';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/entities/booking.entity';
import { DatabaseModule } from '../database.module';
import { Vehicle } from '../models/entities/vehicle.entity';

function createMockBooking(id:string, vehicleId: string, plate: string, date: string): Booking {
  const entity = new Booking();
  const vehichle = new Vehicle();
  vehichle.id = vehicleId;
  entity.vehicle = vehichle;
  entity.bookingId = id;
  entity.plate = plate;
  entity.date = date;
  return entity
}

describe('BookingService', () => {
  let service: BookingService;
  let bookingRepository: Repository<Booking>;
  let vehicleRepository: Repository<Vehicle>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [BookingService],
    }).compile();

    bookingRepository = app.get<Repository<Booking>>('BOOKING_REPOSITORY');
    vehicleRepository = app.get<Repository<Vehicle>>('VEHICLE_REPOSITORY');
    service = app.get<BookingService>(BookingService);
  });

  describe('findBookings', () => {
    it('should return Booking list', async () => {
      const limit = 3;
      const mockResponse: Booking[] = [
        createMockBooking("1", "1", "ABC123", "01/12/2022"),
        createMockBooking("2", "2", "ABC456", "01/12/2022"),
        createMockBooking("2", "2", "ABC789", "01/12/2022")
      ];
      const expected: BookingDto[] = [];
      
      mockResponse.forEach((item) => {
        expected.push(item.toDTO());
      });

      jest.spyOn(bookingRepository, 'find').mockImplementation(async () => mockResponse);

      const actual = await service.findBookings(limit);

      expect(actual).toHaveLength(limit);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('findBooking', () => {
    it('should return Booking details', async () => {
      const mockResponse: Booking = createMockBooking("1", "1", "ABC123", "01/12/2022");
      const expected: BookingDto = mockResponse.toDTO();

      jest.spyOn(bookingRepository, 'findOne').mockImplementation(async () => mockResponse);

      const actual = await service.findBooking("1");

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('saveOrUpdateBooking', () => {
    it('should save new Booking', async () => {
      const mockResponse: Booking = createMockBooking("1", "1", "ABC123", "01/12/2022");
      const expected: BookingDto = mockResponse.toDTO();

      jest.spyOn(bookingRepository, 'save').mockImplementation(async () => mockResponse);
      jest.spyOn(bookingRepository, 'findOne').mockImplementation(async () => mockResponse);
      jest.spyOn(vehicleRepository, 'findOneBy').mockImplementation(async () => mockResponse.vehicle);

      await service.saveOrUpdateBooking(new BookingDto(null, "1", "ABC123", "01/12/2022"));
      const actual = await service.findBooking("1");

      expect(actual).toStrictEqual(expected);
      expect(bookingRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should update existing Booking', async () => {
      const mockResponse: Booking = createMockBooking("1", "1", "ABC123", "01/12/2022");
      const expected: BookingDto = mockResponse.toDTO();

      jest.spyOn(bookingRepository, 'save').mockImplementation(async () => mockResponse);
      jest.spyOn(bookingRepository, 'findOne').mockImplementation(async () => mockResponse);

      await service.saveOrUpdateBooking(expected);
      const actual = await service.findBooking("1");

      expect(actual).toStrictEqual(expected);
      expect(bookingRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteBooking', () => {
    it('should delete Booking', async () => {
      const mockResponse: Booking = createMockBooking("1", "1", "ABC123", "01/12/2022");

      jest.spyOn(bookingRepository, 'remove').mockImplementation(async () => mockResponse);
      jest.spyOn(bookingRepository, 'findOneBy').mockImplementation(async () => mockResponse);

      await service.deleteBooking("1");
      
      expect(bookingRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
