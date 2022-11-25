import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { AppService } from '../services/app.service';
import { BookingDto } from '../models/dtos/booking.dto';

describe('BookingController', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [AppService],
    }).compile();

    controller = app.get<BookingController>(BookingController);
  });

  describe('Booking Contoller - CRUD', () => {
    it('should return Booking list', () => {
      expect(controller.getBookings(2)).toBeDefined();
    });

    it('should return Booking details', () => {
        expect(controller.getBooking('0000-1111')).toBeDefined();
    });

    it('should create a new booking', () => {
        const expectedResult = 'new booking created';
        const newBooking = new BookingDto(null, '0000-1111', 'ABC123', '01-12-2022');
        expect(controller.createBooking(newBooking)).toBe(expectedResult);
    });

    it('should modify a booking', () => {
        const expectedResult = 'Modified this booking 2222-3333';
        const editableBooking = new BookingDto('2222-3333', '0000-1111', 'ABC123', '01-12-2022');
        expect(controller.modifyBooking('2222-3333', editableBooking)).toBe(expectedResult);
    });

    it('should delete a booking', () => {
        const expectedResult = 'Deleted this booking 2222-3333';
        expect(controller.deleteBooking('2222-3333')).toBe(expectedResult);
    });
  });
});
