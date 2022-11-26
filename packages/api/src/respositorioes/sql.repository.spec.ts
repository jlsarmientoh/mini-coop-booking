import { Test, TestingModule } from '@nestjs/testing';
import { SQLRepository } from './sql.respository';
import { Booking } from '../models/entities/booking.entity';

describe('SQLRepository', () => {
    let repository: SQLRepository;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [SQLRepository]
        }).compile();

        repository = app.get<SQLRepository>(SQLRepository);
    });

    describe('findAll', () => {
        it('Should return an array of N Bookings', async () => {
            setTimeout( async () => {
                const limit: number = 1;
                expect(await repository.findAll(limit)).toHaveLength(limit);
            }, 1000);
        });
    });

    describe('find', () => {
        it('Should return a single Booking', async () => {
            setTimeout( async () => {
                const limit: number = 1;
                const listResult: Booking[] = await repository.findAll(limit);
                expect(await repository.find(listResult[0].bookingId)).toBe(listResult[0]);
            }, 1000);
        });
    });

    describe('save', () => {
        it('Should save a new Booking', async () => {
            setTimeout( async () => {
                const limit: number = 2;
                const initialResult: Booking[] = await repository.findAll(limit);
                const initialSize: number = initialResult.length;
                const newBooking = new Booking(null, initialResult[0].vehicleId, initialResult[0].plate, "01-12-2022");
                
                await repository.save(newBooking);

                const finalResult: Booking[] = await repository.findAll(limit);
                const finalSize: number = finalResult.length;

                expect(finalSize).toBeGreaterThan(initialSize);
            }, 1000);
        });
    });

    describe('update', () => {
        it('Should update an existing Booking', async () => {
            setTimeout( async () => {
                const limit: number = 2;
                const initialResult: Booking[] = await repository.findAll(limit);
                const bookingToUpdate: Booking = initialResult[0];
                const newDate: string = '31-12-2022';
                bookingToUpdate.date = newDate
                
                await repository.update(bookingToUpdate);

                const finalResult: Booking = await repository.find(bookingToUpdate.bookingId);
                
                expect(finalResult[0].date).toBe(newDate);
            }, 1000);
        });
    });
});