import { IEntity } from "../entities/entity";

export interface DTO {
    toEntity(): IEntity;
}