import { Entity } from "../entities/entity";

export interface DTO {
    toEntity(): Entity;
}