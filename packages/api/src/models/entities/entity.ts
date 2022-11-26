import { DTO } from "../dtos/dto";

export interface Entity {
    toDTO(): DTO;
}