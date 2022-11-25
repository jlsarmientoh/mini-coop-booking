import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { BookingController } from './controllers/booking.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [AppController, BookingController],
  providers: [AppService],
})
export class AppModule {}
