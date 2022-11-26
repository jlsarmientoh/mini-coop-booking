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
});