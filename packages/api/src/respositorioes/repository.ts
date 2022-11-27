import { IEntity } from "../models/entities/entity";

export interface Repository<T extends IEntity> {
    save(T): Promise<void>;
    findAll(limit: number): Promise<T[]>;
    find(id: string): Promise<T>;
    update(T): Promise<void>;
    delete(id: string): Promise<void>;
}