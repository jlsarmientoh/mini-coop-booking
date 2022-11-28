import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BookingDto } from './../src/models/dtos/booking.dto';
import { CreateVehicleDto } from '../src/models/dtos/create-vehicle.dto';
import { report } from 'process';

let currentVehicleId;
let currentBookingId;

function createVehicleDto(plate: string, brand: string){
  const dto = new CreateVehicleDto();
  dto.brand = brand;
  dto.plate = plate;
  return dto;
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/vehicles (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/vehicles')
      .send(createVehicleDto("ABC123", "KIA"))
      .expect(201).then(reponse => {
        currentVehicleId = reponse.body.id;
      });
  });

  it('/api/vehicles (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/vehicles')
      .expect(200);
  });

  it('/api/vehicles/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/api/vehicles/${currentVehicleId}`)
      .expect(200);
  });

  it('/api/bookings (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/bookings')
      .send(new BookingDto("", currentVehicleId, "ABC123", Date.now().toString()))
      .expect(201).then( response => {
        currentBookingId = response.body.bookingId;
      });
  });

  it('/api/bookings (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/bookings?limit=1')
      .expect(200);
  });

  it('/api/bookings/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/api/bookings/${currentBookingId}`)
      .expect(200);
  });
});
