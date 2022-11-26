import { Entity } from "../models/entities/entity";

export interface Repository<T extends Entity> {
    save(T): Promise<void>;
    findAll(limit: number): Promise<T[]>;
    find(id: string): Promise<T>;
    update(T): Promise<void>;
    delete(id: string): Promise<void>;
}