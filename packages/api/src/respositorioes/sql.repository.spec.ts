import { Test, TestingModule } from '@nestjs/testing';
import { SQLRepository } from './sql.respository';
import { Booking } from '../models/entities/booking.entity';
import { DatabaseModule } from '../database.module';

describe('SQLRepository', () => {
    let repository: SQLRepository;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule]
        }).compile();

        repository = app.get<SQLRepository>('SQL');
    });

    describe('findAll', () => {
        it('Should return an array of N Bookings', async () => {
            const limit: number = 1;
            expect(await repository.findAll(limit)).toHaveLength(limit);
        });
    });

    describe('find', () => {
        it('Should return a single Booking', async () => {
            const limit: number = 1;
            const listResult: Booking[] = await repository.findAll(limit);
            expect(await repository.find(listResult[0].bookingId)).toStrictEqual(listResult[0]);
        });
    });

    describe('save', () => {
        it('Should save a new Booking', async () => {
            const limit: number = 2;
            const initialResult: Booking[] = await repository.findAll(limit);
            const initialSize: number = initialResult.length;
            const newBooking = new Booking(null, initialResult[0].vehicleId, initialResult[0].plate, "01-12-2022");
            
            await repository.save(newBooking);

            const finalResult: Booking[] = await repository.findAll(limit);
            const finalSize: number = finalResult.length;

            expect(finalSize).toBeGreaterThan(initialSize);
        });
    });

    describe('update', () => {
        it('Should update an existing Booking', async () => {
            const limit: number = 2;
            const initialResult: Booking[] = await repository.findAll(limit);
            const bookingToUpdate: Booking = initialResult[0];
            const newDate: number = Date.now();
            bookingToUpdate.date = newDate.toString();
            
            await repository.update(bookingToUpdate);

            const finalResult: Booking = await repository.find(bookingToUpdate.bookingId);
            
            expect(finalResult.date).toBe(newDate);
        });
    });

    describe('delete', () => {
        it('Should delete an existing Booking', async () => {
            const limit: number = 2;
            const initialResult: Booking[] = await repository.findAll(limit);
            const bookingToDelete: Booking = initialResult[0];
            
            expect(await repository.delete(bookingToDelete.bookingId)).toBeUndefined();
        });
    });
});