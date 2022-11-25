import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [AppService],
    }).compile();

    controller = app.get<BookingController>(BookingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getBookings(2)).toBeDefined();
    });
  });
});
