import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { BookingController } from './controllers/booking.controller';
import { MongoRespository } from './respositorioes/mongo.repository';
import { SQLRepository } from './respositorioes/sql.respository';
import { AppService } from './services/app.service';
import { BookingService } from './services/booking.service';

@Module({
  imports: [],
  controllers: [AppController, BookingController],
  providers: [AppService, BookingService, MongoRespository, SQLRepository],
})
export class AppModule {}
