import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BookingDto } from './../src/models/dtos/booking.dto';

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

  it('/api/bookings (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/bookings?limit=1')
      .expect(500);
  });

  it('/api/bookings/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/bookings/abc')
      .expect(404);
  });

  it('/api/bookings (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/bookings')
      .send(new BookingDto(null, "123", "ABC123", "123456789"))
      .expect(500);
  });

  it('/api/bookings (PUT)', () => {
    return request(app.getHttpServer())
      .put('/api/bookings/abc')
      .send(new BookingDto(null, "123", "ABC123", "123456789"))
      .expect(500);
  });

  it('/api/bookings (Delete)', () => {
    return request(app.getHttpServer())
      .delete('/api/bookings/abc')
      .expect(500);
  });
});
