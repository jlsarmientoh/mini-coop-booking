import { DTO } from "../dtos/dto";

export interface IEntity {
    toDTO(): DTO;
}