import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { BookingController } from './controllers/booking.controller';
import { DatabaseModule } from './database.module';
import { MongoRespository } from './respositorioes/mongo.repository';
import { AppService } from './services/app.service';
import { BookingService } from './services/booking.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, BookingController],
  providers: [AppService, BookingService, MongoRespository],
})
export class AppModule {}
