import { Injectable } from "@nestjs/common";
import { Booking } from "../models/entities/booking.entity";
import { Repository } from "./repository";
import connect, { sql } from '@databases/sqlite';
const crypto = require('crypto');

@Injectable()
export class SQLRepository implements Repository<Booking> {

    private readonly db;

    constructor() {
        this.db = connect()
        const prepare = async () => {
            await this.initDb();
            await this.populate();
            //console.log('Database ready!!!');
        };
        prepare();
    }

    async initDb() {
        await this.db.query(sql`
            CREATE TABLE VEHICLES (
                ID VARCHAR NOT NULL PRIMARY KEY,
                PLATE VARCHAR NOT NULL
            );
        `);
        await this.db.query(sql`
            CREATE TABLE BOOKINGS (
                ID VARCHAR NOT NULL PRIMARY KEY,
                VEHICLE_ID VARCHAR NOT NULL,
                DATE INTEGER NOT NULL,
                FOREIGN KEY(VEHICLE_ID) REFERENCES VEHICLES(ID)
            );
        `);  
    }

    async populate() {
        const vehicle1ID = crypto.randomUUID();
        const vehicle2ID = crypto.randomUUID();
        await this.db.query(sql`
            INSERT INTO VEHICLES (
                ID,
                PLATE
            ) VALUES (${vehicle1ID}, 'ABC123');
        `);
        await this.db.query(sql`
            INSERT INTO VEHICLES (
                ID,
                PLATE
            ) VALUES (${vehicle2ID}, 'XYZ456');
        `);
        await this.db.query(sql`
            INSERT INTO BOOKINGS (
                ID,
                VEHICLE_ID,
                DATE                
            ) VALUES (${crypto.randomUUID()}, ${vehicle1ID}, ${Date.now()});
        `);
    }

    async save(T: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findAll(limit: number): Promise<Booking[]> {
        const bookings: Array<Booking> = new Array<Booking>();
        const results = await this.db.query(sql`SELECT 
        B.ID, 
        B.VEHICLE_ID, 
        B.DATE,
        V.PLATE 
        FROM BOOKINGS B JOIN VEHICLES V 
        ON B.VEHICLE_ID = V.ID 
        LIMIT ${limit}
        `);

        if(results.length) {
            
            results.forEach(element => {
                console.log(JSON.stringify(element));
                bookings.push(
                    new Booking(
                        element.ID, 
                        element.VEHICLE_ID, 
                        element.PLATE, 
                        element.DATE
                        )
                );
            });
        }
        
        return bookings;
    }
    async find(id: string): Promise<Booking> {
        const results = await this.db.query(sql`SELECT 
        B.ID, 
        B.VEHICLE_ID, 
        B.DATE,
        V.PLATE 
        FROM BOOKINGS B JOIN VEHICLES V 
        ON B.VEHICLE_ID = V.ID 
        WHERE B.ID = ${id}
        `);

        if(results.length) {
            return new Booking(
                results[0].ID, 
                results[0].VEHICLE_ID, 
                results[0].PLATE, 
                results[0].DATE
            );
        } else {
            console.log(JSON.stringify(results));
            throw new Error("No Bookings Found.");
        }
    }
    async update(T: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}