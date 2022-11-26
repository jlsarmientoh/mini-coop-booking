import { Injectable } from "@nestjs/common";
import { Booking } from "src/models/entities/booking.entity";
import { Repository } from "./repository";

@Injectable()
export class MongoRespository implements Repository<Booking> {
    save(T: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAll(limit: number): Promise<Booking[]> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    update(T: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}