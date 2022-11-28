import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { AppService } from '../services/app.service';
import { BookingDto } from '../models/dtos/booking.dto';
import { BookingService } from '../services/booking.service';
import { DatabaseModule } from '../database.module';

describe('BookingController', () => {
  let controller: BookingController;
  let service: BookingService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [BookingController],
      providers: [AppService, BookingService],
    }).compile();

    controller = app.get<BookingController>(BookingController);
    service = app.get<BookingService>(BookingService);
  });

  describe('Booking Contoller - CRUD', () => {
    it('should return Booking list', async () => {
      const limit = 3;
      const expected: BookingDto[] = [
        new BookingDto("1", "1", "ABC123", "01/12/2022"),
        new BookingDto("2", "2", "ABC456", "01/12/2022"),
        new BookingDto("2", "2", "ABC789", "01/12/2022")
      ];
      jest.spyOn(service, 'findBookings').mockImplementation(async () => expected);

      const actual = await controller.getBookings(limit);

      expect(actual).toHaveLength(limit);
      expect(actual).toBe(expected);
    });

    it('should return Booking details', async () => {
      const expected: BookingDto = new BookingDto("1", "1", "ABC123", "01/12/2022");
      jest.spyOn(service, 'findBooking').mockImplementation(async () => expected);

      const actual = await controller.getBooking("1");

      expect(actual).toBe(expected);
      expect(service.findBooking).toBeCalled();
    });

    it('should create a new booking', async () => {
        const newBooking = new BookingDto(null, '0000-1111', 'ABC123', '01-12-2022');
        jest.spyOn(service, 'saveOrUpdateBooking').mockImplementation(async () => newBooking);

        expect( await controller.createBooking(newBooking)).toBe(newBooking);
        expect(service.saveOrUpdateBooking).toBeCalled();
    });

    it('should modify a booking', async () => {
        const editableBooking = new BookingDto('2222-3333', '0000-1111', 'ABC123', '01-12-2022');
        jest.spyOn(service, 'saveOrUpdateBooking').mockImplementation(async () => editableBooking);

        expect( await controller.modifyBooking('2222-3333', editableBooking)).toBe(editableBooking);
        expect(service.saveOrUpdateBooking).toBeCalled();
    });

    it('should delete a booking', async () => {
        const removableBooking = new BookingDto('2222-3333', '0000-1111', 'ABC123', '01-12-2022');
        jest.spyOn(service, 'deleteBooking').mockImplementation(async () => removableBooking);

        expect( await controller.deleteBooking('2222-3333')).toBe(removableBooking);
        expect(service.deleteBooking).toBeCalled();
    });
  });
});
