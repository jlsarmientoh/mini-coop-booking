import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { BookingController } from './controllers/booking.controller';
import { VehiclesController } from './controllers/vehicles.controller';
import { DatabaseModule } from './database.module';
import { MongoRespository } from './respositorioes/mongo.repository';
import { AppService } from './services/app.service';
import { BookingService } from './services/booking.service';
import { VehicleService } from './services/vehicle.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, BookingController, VehiclesController],
  providers: [ 
    AppService, 
    BookingService, 
    VehicleService, 
    MongoRespository],
})
export class AppModule {}
